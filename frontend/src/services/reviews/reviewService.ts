import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from '../../types';

export const reviewService = {
  async getAll(params?: {
    customerName?: string;
    minRating?: string | number;
    onlyApproved?: string;
  }): Promise<Review[]> {
    const response = await axiosInstance.get(API_ENDPOINTS.REVIEWS.BASE, {
      params,
    });
    return Array.isArray(response.data) ? response.data : [];
  },

  async getById(id: string): Promise<Review> {
    const response = await axiosInstance.get(`${API_ENDPOINTS.REVIEWS.BASE}/${id}`);
    return response.data;
  },

  async create(payload: CreateReviewRequest): Promise<Review> {
    const response = await axiosInstance.post(API_ENDPOINTS.REVIEWS.BASE, payload);
    return response.data;
  },

  async update(id: string, payload: UpdateReviewRequest): Promise<Review> {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.REVIEWS.BASE}/${id}`,
      payload
    );
    return response.data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.REVIEWS.BASE}/${id}`);
    return response.data;
  },
};