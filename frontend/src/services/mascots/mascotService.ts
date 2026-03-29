import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  Mascot,
  CreateMascotRequest,
  UpdateMascotRequest,
} from '../../types';

export const mascotService = {
  async getAll(params?: { name?: string; maxPrice?: string | number }): Promise<Mascot[]> {
    const response = await axiosInstance.get(API_ENDPOINTS.MASCOTS.BASE, {
      params,
    });
    return Array.isArray(response.data) ? response.data : [];
  },

  async getById(id: string): Promise<Mascot> {
    const response = await axiosInstance.get(`${API_ENDPOINTS.MASCOTS.BASE}/${id}`);
    return response.data;
  },

  async create(payload: CreateMascotRequest): Promise<Mascot> {
    const response = await axiosInstance.post(API_ENDPOINTS.MASCOTS.BASE, payload);
    return response.data;
  },

  async update(id: string, payload: UpdateMascotRequest): Promise<Mascot> {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.MASCOTS.BASE}/${id}`,
      payload
    );
    return response.data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.MASCOTS.BASE}/${id}`);
    return response.data;
  },
};