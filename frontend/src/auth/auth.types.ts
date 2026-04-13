export type UserRole = 'CUSTOMER' | 'MERCHANT' | 'DELIVERY' | 'ADMIN';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  approvalStatus: ApprovalStatus;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
};

export type AuthResponse = {
  accessToken: string | null;
  user: AuthUser;
  message?: string;
};
