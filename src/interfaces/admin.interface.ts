export interface SigninParams {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  username: string;
  password: string;
}

export interface ResetParams {
  email: string;
  newPassword: string;
}

export interface DeleteAdminParams {
  id: number
}