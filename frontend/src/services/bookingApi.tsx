const API_BASE_URL = 'http://localhost:5000/api';

export type PublicBookingPayload = {
  full_name: string;
  email: string;
  phone: string;
  event_title: string;
  event_type: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue_name: string;
  venue_address: string;
  guest_count: number;
  special_requests: string;
  package_id: number | '';
};

export async function createPublicBooking(payload: PublicBookingPayload) {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      package_id: payload.package_id === '' ? null : payload.package_id,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to create booking');
  }

  return response.json();
}