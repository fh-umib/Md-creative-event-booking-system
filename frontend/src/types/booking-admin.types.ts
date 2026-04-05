import type { BookingRecord, BookingStatus, PaymentStatus } from './booking.types';

export interface AdminBookingStats {
  totalBookings: number;
  pendingBookings: number;
  approvedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  unpaidBookings: number;
  paidBookings: number;
}

export interface AdminBookingFilters {
  search: string;
  status: BookingStatus | '';
  paymentStatus: PaymentStatus | '';
  category: string;
  eventDate: string;
}

export interface AdminBookingListResponse {
  items: BookingRecord[];
  stats: AdminBookingStats;
}