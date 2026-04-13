import { ApprovalStatus, UserRole } from '@prisma/client';

export type JwtPayload = {
  sub: string;
  role: UserRole;
};

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  approvalStatus: ApprovalStatus;
};
