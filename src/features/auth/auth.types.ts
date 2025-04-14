export interface RegisterPayload {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

// iguales
export interface RegisterResponse {
  status: string;
  message: string;
  token: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

// iguales
export interface LoginResponse {
  status: string;
  message: string;
  token: string;
}

/* export interface AuthResponse {
  status: string;
  message: string;
  token: string;
} */
