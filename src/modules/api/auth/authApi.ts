import axiosInstance from "../../../shared/utils/axiosConfig.ts";
import type {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, UserWithToken} from '../../types/auth.ts';

export const authApi = {
  login : async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await axiosInstance.post<LoginResponse>(
          "/User/login-user",
          data
      );
      return response.data;
  },

  logout : async (refreshToken: string) => {
      return axiosInstance.post('/User/logout', { refreshToken });
  },

  refreshToken: async (refreshToken: string) : Promise<UserWithToken>=> {
      const response = await axiosInstance.post<UserWithToken>(
          "/User/refresh-token",
          refreshToken
      )
      return response.data;
  },

  register: async (data : RegisterRequest): Promise<RegisterResponse> => {
      const response = await axiosInstance.post(
          '/User/register-user',
          data
      );
      return response.data;
  }
};