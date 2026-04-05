import { useCallback, useMemo, useState } from 'react';
import { bookingAdminService } from '../services/bookings/bookingAdminService';
import type {
  AdminBookingFilters,
  AdminBookingStats,
  BookingRecord,
} from '../types';

const initialFilters: AdminBookingFilters = {
  search: '',
  status: '',
  paymentStatus: '',
  category: '',
  eventDate: '',
};

function calculateStats(items: BookingRecord[]): AdminBookingStats {
  return {
    totalBookings: items.length,
    pendingBookings: items.filter((item) => item.status === 'Pending').length,
    approvedBookings: items.filter((item) => item.status === 'Approved').length,
    completedBookings: items.filter((item) => item.status === 'Completed').length,
    cancelledBookings: items.filter((item) => item.status === 'Cancelled').length,
    unpaidBookings: items.filter((item) => item.payment_status === 'Unpaid').length,
    paidBookings: items.filter((item) => item.payment_status === 'Paid').length,
  };
}

export function useBookingAdmin() {
  const [items, setItems] = useState<BookingRecord[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [filters, setFilters] = useState<AdminBookingFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async (nextFilters?: Partial<AdminBookingFilters>) => {
    try {
      setIsLoading(true);
      setError(null);

      const mergedFilters = {
        ...initialFilters,
        ...filters,
        ...(nextFilters || {}),
      };

      const data = await bookingAdminService.getAll(mergedFilters);

      setItems(data);
      setFilters(mergedFilters);
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const fetchBookingById = useCallback(async (id: number) => {
    try {
      setError(null);
      const data = await bookingAdminService.getById(id);
      setSelectedBooking(data);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to load booking details.');
      return null;
    }
  }, []);

  const updateStatus = useCallback(async (id: number, status: string) => {
    const updated = await bookingAdminService.updateStatus(id, status);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    if (selectedBooking?.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, ...updated } : prev));
    }
    return updated;
  }, [selectedBooking]);

  const updatePaymentStatus = useCallback(async (id: number, paymentStatus: string) => {
    const updated = await bookingAdminService.updatePaymentStatus(id, paymentStatus);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    if (selectedBooking?.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, ...updated } : prev));
    }
    return updated;
  }, [selectedBooking]);

  const deleteBooking = useCallback(async (id: number) => {
    await bookingAdminService.delete(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedBooking?.id === id) {
      setSelectedBooking(null);
    }
  }, [selectedBooking]);

  const stats = useMemo(() => calculateStats(items), [items]);

  return {
    items,
    selectedBooking,
    filters,
    isLoading,
    error,
    stats,
    setFilters,
    setSelectedBooking,
    fetchBookings,
    fetchBookingById,
    updateStatus,
    updatePaymentStatus,
    deleteBooking,
  };
}