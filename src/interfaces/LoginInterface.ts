export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string;
  token: string;
  id: number;
}
