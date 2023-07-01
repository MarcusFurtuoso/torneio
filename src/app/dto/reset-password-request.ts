export interface ResetPasswordRequest {
  resetToken?: string;
  password: string;
  confirmPassword: string;
}
