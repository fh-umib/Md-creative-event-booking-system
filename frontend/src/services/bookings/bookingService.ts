import { API_URL } from '../apiBase';

export type BookingPayload = {
  id?: number;
  customerId?: number | null;
  customer_id?: number | null;

  customerName?: string;
  customer_name?: string;

  customerEmail?: string;
  customer_email?: string;

  customerPhone?: string;
  customer_phone?: string;

  full_name?: string;
  email?: string;
  phone?: string;

  eventTitle?: string;
  event_title?: string;

  eventType?: string;
  event_type?: string;

  category?: string;

  eventDate?: string;
  event_date?: string;

  eventTime?: string;
  event_time?: string;

  start_time?: string;
  end_time?: string;

  eventLocation?: string;
  event_location?: string;

  venueName?: string;
  venue_name?: string;

  venueAddress?: string;
  venue_address?: string;

  guestCount?: number | null;
  guest_count?: number | null;

  packageId?: number | null;
  package_id?: number | null | '';

  notes?: string | null;
  special_requests?: string | null;

  selectedMascots?: number[];
  selectedActivities?: number[];
  selectedExtras?: number[];

  status?: string;
  payment_status?: string;
};

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      'Serveri nuk ktheu përgjigje JSON. Kontrollo API URL dhe backend route.',
    );
  }
}

export async function getAll() {
  const response = await fetch(`${API_URL}/bookings`);

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Rezervimet nuk u morën.');
  }

  return data;
}

export async function createBooking(payload: BookingPayload) {
  const cleanedPayload = {
    ...payload,
    package_id: payload.package_id === '' ? null : payload.package_id,
  };

  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cleanedPayload),
  });

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Rezervimi dështoi.');
  }

  return data;
}

export async function create(payload: BookingPayload) {
  return createBooking(payload);
}

export async function getMyBookings(customerId: number) {
  const response = await fetch(`${API_URL}/bookings/customer/${customerId}`);

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Rezervimet nuk u morën.');
  }

  return data;
}

export async function updateStatus(id: number, status: string) {
  const response = await fetch(`${API_URL}/bookings/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Statusi i rezervimit nuk u përditësua.');
  }

  return data;
}

export const bookingService = {
  getAll,
  create,
  createBooking,
  getMyBookings,
  updateStatus,
};