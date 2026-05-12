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

  fullName?: string;
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

  startTime?: string;
  start_time?: string;

  endTime?: string;
  end_time?: string;

  eventLocation?: string;
  event_location?: string;

  venueName?: string;
  venue_name?: string;

  venueAddress?: string;
  venue_address?: string;

  guestCount?: number | null;
  guest_count?: number | null;

  packageId?: number | null | '';
  package_id?: number | null | '';

  notes?: string | null;
  specialRequests?: string | null;
  special_requests?: string | null;

  selectedMascots?: number[];
  selectedActivities?: number[];
  selectedExtras?: number[];

  mascotIds?: number[];
  activityIds?: number[];
  extraIds?: number[];

  status?: string;
  paymentStatus?: string;
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

function normalizeBookingPayload(payload: BookingPayload) {
  return {
    ...payload,

    customer_id: payload.customer_id ?? payload.customerId ?? null,

    full_name:
      payload.full_name ??
      payload.fullName ??
      payload.customer_name ??
      payload.customerName ??
      '',

    email: payload.email ?? payload.customer_email ?? payload.customerEmail ?? '',

    phone: payload.phone ?? payload.customer_phone ?? payload.customerPhone ?? '',

    event_title: payload.event_title ?? payload.eventTitle ?? '',

    event_type: payload.event_type ?? payload.eventType ?? payload.category ?? '',

    event_date: payload.event_date ?? payload.eventDate ?? '',

    start_time:
      payload.start_time ??
      payload.startTime ??
      payload.event_time ??
      payload.eventTime ??
      '',

    end_time: payload.end_time ?? payload.endTime ?? '',

    venue_name:
      payload.venue_name ??
      payload.venueName ??
      payload.event_location ??
      payload.eventLocation ??
      '',

    venue_address:
      payload.venue_address ??
      payload.venueAddress ??
      payload.event_location ??
      payload.eventLocation ??
      '',

    guest_count: payload.guest_count ?? payload.guestCount ?? null,

    package_id:
      payload.package_id === ''
        ? null
        : payload.package_id ?? payload.packageId ?? null,

    special_requests:
      payload.special_requests ??
      payload.specialRequests ??
      payload.notes ??
      null,
  };
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
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(normalizeBookingPayload(payload)),
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