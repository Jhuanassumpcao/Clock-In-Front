import apiClient from "../api/axiosConfig";
import { RegisterData, RegisterResponse } from "../interfaces/RegisterInterfaces";

class RegisterService {
  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>("/auth/register", data);
    return response.data;
  }
}

export default new RegisterService();
