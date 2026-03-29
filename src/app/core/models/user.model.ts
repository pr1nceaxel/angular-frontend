export interface AuthUser {
  login: string;
  role: 'user' | 'admin';
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
