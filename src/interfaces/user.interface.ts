export interface SigninParams {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  username: string;
  password: string;
  phone_number: string;
}

export interface Recover {
  email: string;
}
