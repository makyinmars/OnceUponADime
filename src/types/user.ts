export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}
