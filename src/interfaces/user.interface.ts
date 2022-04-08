export interface SigninParams {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
}

export interface RecoverParams {
  email: string;
}
