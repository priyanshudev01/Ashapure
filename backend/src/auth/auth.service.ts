import { ApprovalStatus, UserRole } from '@prisma/client';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthUser, JwtPayload } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const email = registerDto.email.trim().toLowerCase();

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const approvalStatus = this.getApprovalStatusForRole(registerDto.role);
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        fullName: registerDto.fullName.trim(),
        passwordHash,
        role: registerDto.role,
        approvalStatus,
      },
      select: this.userSelect,
    });

    const authUser = this.toAuthUser(user);
    const accessToken =
      authUser.approvalStatus === ApprovalStatus.APPROVED
        ? await this.signToken({ sub: authUser.id, role: authUser.role })
        : null;

    return {
      message:
        authUser.approvalStatus === ApprovalStatus.PENDING
          ? 'Registration complete. Account is pending admin approval.'
          : 'Registration successful.',
      accessToken,
      user: authUser,
    };
  }

  async login(loginDto: LoginDto) {
    const email = loginDto.email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        ...this.userSelect,
        passwordHash: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (
      (user.role === UserRole.MERCHANT || user.role === UserRole.DELIVERY) &&
      user.approvalStatus !== ApprovalStatus.APPROVED
    ) {
      throw new ForbiddenException('Your account is pending admin approval');
    }

    const authUser = this.toAuthUser(user);
    const accessToken = await this.signToken({ sub: authUser.id, role: authUser.role });

    return {
      accessToken,
      user: authUser,
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: this.userSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toAuthUser(user);
  }

  private async signToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  private getApprovalStatusForRole(role: UserRole): ApprovalStatus {
    if (role === UserRole.MERCHANT || role === UserRole.DELIVERY) {
      return ApprovalStatus.PENDING;
    }

    return ApprovalStatus.APPROVED;
  }

  private toAuthUser(user: {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    approvalStatus: ApprovalStatus;
  }): AuthUser {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      approvalStatus: user.approvalStatus,
    };
  }

  private readonly userSelect = {
    id: true,
    email: true,
    fullName: true,
    role: true,
    approvalStatus: true,
  };
}
