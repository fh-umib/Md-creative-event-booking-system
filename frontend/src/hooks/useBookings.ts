import { useCallback, useEffect, useState } from 'react';
import { bookingService } from '../services/bookings/bookingService';
import type {
  Booking,
  CreateBookingRequest,
  BookingStatus,
} from '../types';

console.log('BOOKING SERVICE:', bookingService);

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await bookingService.getAll();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load bookings.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBooking = async (payload: CreateBookingRequest) => {
    const created = await bookingService.create(payload);
    setBookings((prev) => [...prev, created]);
    return created;
  };

  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    const updated = await bookingService.updateStatus(id, { status });
    setBookings((prev) => prev.map((item) => (item.id === id ? updated : item)));
    return updated;
  };

  const deleteBooking = async (id: string) => {
    await bookingService.remove(id);
    setBookings((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    isLoading,
    error,
    fetchBookings,
    createBooking,
    updateBookingStatus,
    deleteBooking,
  };
}