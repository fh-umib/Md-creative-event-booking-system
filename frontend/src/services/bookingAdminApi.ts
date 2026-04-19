const API_BASE_URL = 'http://localhost:5000/api';

export type AdminBooking = {
  id: number;
  booking_code: string;
  event_title: string;
  event_type: string | null;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  guest_count: number;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  payment_status: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Refunded' | string;
  total_price: string | number;
  deposit_amount: string | number;
  remaining_balance: string | number;
  created_at: string;
  customer_name: string;
  customer_email: string;
  package_title: string | null;
  customer_phone?: string | null;
  venue_name?: string | null;
  venue_address?: string | null;
  special_requests?: string | null;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

function getAuthToken() {
  return localStorage.getItem('md_auth_token');
}

function getAuthHeaders(includeJson = false): HeadersInit {
  const token = getAuthToken();

  return {
    ...(includeJson ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseResponse<T>(
  response: Response,
  fallbackMessage: string
): Promise<T> {
  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((json as { message?: string }).message || fallbackMessage);
  }

  const parsed = json as ApiResponse<T> | T;

  if (
    typeof parsed === 'object' &&
    parsed !== null &&
    'data' in parsed
  ) {
    return (parsed as ApiResponse<T>).data as T;
  }

  return parsed as T;
}

export async function getAdminBookings(
  search = '',
  status = ''
): Promise<AdminBooking[]> {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set('search', search.trim());
  }

  if (status.trim()) {
    params.set('status', status.trim());
  }

  const query = params.toString();

  const response = await fetch(
    `${API_BASE_URL}/admin/bookings${query ? `?${query}` : ''}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return parseResponse<AdminBooking[]>(response, 'Failed to load bookings');
}

export async function getAdminBookingById(id: number): Promise<AdminBooking> {
  const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<AdminBooking>(
    response,
    'Failed to load booking details'
  );
}

export async function updateAdminBookingStatus(
  id: number,
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled'
): Promise<AdminBooking> {
  const response = await fetch(
    `${API_BASE_URL}/admin/bookings/${id}/status`,
    {
      method: 'PATCH',
      headers: getAuthHeaders(true),
      body: JSON.stringify({ status }),
    }
  );

  return parseResponse<AdminBooking>(
    response,
    'Failed to update booking status'
  );
}

export async function updateAdminPaymentStatus(
  id: number,
  payment_status: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Refunded'
): Promise<AdminBooking> {
  const response = await fetch(
    `${API_BASE_URL}/admin/bookings/${id}/payment-status`,
    {
      method: 'PATCH',
      headers: getAuthHeaders(true),
      body: JSON.stringify({ payment_status }),
    }
  );

  return parseResponse<AdminBooking>(
    response,
    'Failed to update payment status'
  );
}

export async function deleteAdminBooking(id: number): Promise<AdminBooking> {
  const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<AdminBooking>(response, 'Failed to delete booking');
}