export interface RegisterPayload {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  token: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  token: string;
}
