import type {
  AdminBookingFilters,
  BookingRecord,
} from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function handleResponse<T>(response: Response): Promise<T> {
  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message || 'Request failed.');
  }

  return json.data as T;
}

function buildQuery(filters: Partial<AdminBookingFilters>) {
  const params = new URLSearchParams();

  if (filters.search) params.set('search', filters.search);
  if (filters.status) params.set('status', filters.status);
  if (filters.paymentStatus) params.set('paymentStatus', filters.paymentStatus);
  if (filters.category) params.set('category', filters.category);
  if (filters.eventDate) params.set('eventDate', filters.eventDate);

  const query = params.toString();
  return query ? `?${query}` : '';
}

export const bookingAdminService = {
  async getAll(filters: Partial<AdminBookingFilters> = {}): Promise<BookingRecord[]> {
    const query = buildQuery(filters);
    const response = await fetch(`${API_BASE_URL}/admin/bookings${query}`);
    return handleResponse<BookingRecord[]>(response);
  },

  async getById(id: number): Promise<BookingRecord> {
    const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`);
    return handleResponse<BookingRecord>(response);
  },

  async updateStatus(id: number, status: string): Promise<BookingRecord> {
    const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    return handleResponse<BookingRecord>(response);
  },

  async updatePaymentStatus(id: number, paymentStatus: string): Promise<BookingRecord> {
    const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}/payment-status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentStatus }),
    });

    return handleResponse<BookingRecord>(response);
  },

  async delete(id: number): Promise<{ success: true }> {
    const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
      method: 'DELETE',
    });

    return handleResponse<{ success: true }>(response);
  },
};