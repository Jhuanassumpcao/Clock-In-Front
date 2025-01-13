import apiClient from '../api/axiosConfig';
import { LoginData, AuthResponse } from '../interfaces/LoginInterface';

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    console.log('netrou aqui', response)
    return response.data;
  }
}

export default new AuthService();
