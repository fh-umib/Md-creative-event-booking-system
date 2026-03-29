import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  Booking,
  CreateBookingRequest,
  UpdateBookingStatusRequest,
} from '../../types';

export const bookingService = {
  async getAll(): Promise<Booking[]> {
    const response = await axiosInstance.get(API_ENDPOINTS.BOOKINGS.BASE);
    return Array.isArray(response.data) ? response.data : [];
  },

  async getById(id: string): Promise<Booking> {
    const response = await axiosInstance.get(`${API_ENDPOINTS.BOOKINGS.BASE}/${id}`);
    return response.data;
  },

  async create(payload: CreateBookingRequest): Promise<Booking> {
    const response = await axiosInstance.post(API_ENDPOINTS.BOOKINGS.BASE, payload);
    return response.data;
  },

  async updateStatus(
    id: string,
    payload: UpdateBookingStatusRequest
  ): Promise<Booking> {
    const response = await axiosInstance.patch(
      `${API_ENDPOINTS.BOOKINGS.BASE}/${id}/status`,
      payload
    );
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`${API_ENDPOINTS.BOOKINGS.BASE}/${id}`);
  },
};