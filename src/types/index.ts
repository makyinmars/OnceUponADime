export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}
