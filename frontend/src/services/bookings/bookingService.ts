import type { BookingRecord, CreateBookingPayload } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function handleResponse<T>(response: Response): Promise<T> {
  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message || 'Request failed.');
  }

  return json.data as T;
}

export const bookingService = {
  async create(payload: CreateBookingPayload): Promise<BookingRecord> {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return handleResponse<BookingRecord>(response);
  },

  async getAll(): Promise<BookingRecord[]> {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    return handleResponse<BookingRecord[]>(response);
  },

  async getById(id: number): Promise<BookingRecord> {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
    return handleResponse<BookingRecord>(response);
  },

  async updateStatus(id: number, status: string): Promise<BookingRecord> {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    return handleResponse<BookingRecord>(response);
  },

  async updatePaymentStatus(id: number, paymentStatus: string): Promise<BookingRecord> {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/payment-status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentStatus }),
    });

    return handleResponse<BookingRecord>(response);
  },
};