import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../../types';

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, payload);
    return response.data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, payload);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },
};