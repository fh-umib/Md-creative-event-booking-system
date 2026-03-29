import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import type { DashboardStats } from '../../types';

export const analyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const [bookingsResponse, packagesResponse, mascotsResponse] =
      await Promise.all([
        axiosInstance.get(API_ENDPOINTS.BOOKINGS.BASE),
        axiosInstance.get(API_ENDPOINTS.PACKAGES.BASE),
        axiosInstance.get(API_ENDPOINTS.MASCOTS.BASE),
      ]);

    const bookings = Array.isArray(bookingsResponse.data) ? bookingsResponse.data : [];
    const packages = Array.isArray(packagesResponse.data) ? packagesResponse.data : [];
    const mascots = Array.isArray(mascotsResponse.data) ? mascotsResponse.data : [];

    return {
      totalBookings: bookings.length,
      totalPackages: packages.length,
      totalMascots: mascots.length,
      totalReviews: 0,
    };
  },
};