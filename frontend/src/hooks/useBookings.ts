import { useCallback, useEffect, useState } from 'react';

import { bookingService } from '../services/bookings/bookingService';
import type { Booking, BookingStatus } from '../types';

export type CreateBookingRequest = {
  customerId: number;
  category: string;
  packageId: number | string;
  eventTitle?: string;
  eventType?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  venueName?: string;
  venueAddress?: string;
  guestCount?: number | string;
  specialRequests?: string;
};

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
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load bookings.';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBooking = async (payload: CreateBookingRequest) => {
    const created = await bookingService.create({
      customerId: Number(payload.customerId),
      category: payload.category || 'general',
      packageId: Number(payload.packageId || 0),
      eventTitle: payload.eventTitle || '',
      eventType: payload.eventType || '',
      eventDate: payload.eventDate || '',
      startTime: payload.startTime || '',
      endTime: payload.endTime || '',
      venueName: payload.venueName || '',
      venueAddress: payload.venueAddress || '',
      guestCount:
        payload.guestCount === undefined || payload.guestCount === ''
          ? 0
          : Number(payload.guestCount),
      specialRequests: payload.specialRequests || '',
    });

    setBookings((prev) => [...prev, created]);

    return created;
  };

  const updateBookingStatus = async (
    id: number | string,
    status: BookingStatus
  ) => {
    const bookingId = Number(id);

    const updated = await bookingService.updateStatus(bookingId, status);

    setBookings((prev) =>
      prev.map((item) => (Number(item.id) === bookingId ? updated : item))
    );

    return updated;
  };

  const deleteBooking = async (id: number | string) => {
    const bookingId = Number(id);

    setBookings((prev) => prev.filter((item) => Number(item.id) !== bookingId));
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