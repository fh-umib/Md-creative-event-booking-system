import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  Package,
  CreatePackageRequest,
  UpdatePackageRequest,
} from '../../types';

export const packageService = {
  async getAll(params?: { name?: string; maxPrice?: string | number }): Promise<Package[]> {
    const response = await axiosInstance.get(API_ENDPOINTS.PACKAGES.BASE, {
      params,
    });
    return Array.isArray(response.data) ? response.data : [];
  },

  async getById(id: string): Promise<Package> {
    const response = await axiosInstance.get(`${API_ENDPOINTS.PACKAGES.BASE}/${id}`);
    return response.data;
  },

  async create(payload: CreatePackageRequest): Promise<Package> {
    const response = await axiosInstance.post(API_ENDPOINTS.PACKAGES.BASE, payload);
    return response.data;
  },

  async update(id: string, payload: UpdatePackageRequest): Promise<Package> {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.PACKAGES.BASE}/${id}`,
      payload
    );
    return response.data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.PACKAGES.BASE}/${id}`);
    return response.data;
  },
};