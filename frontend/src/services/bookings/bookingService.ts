import { API_URL } from '../apiBase';

export type BookingPayload = {
  customerId?: number | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  guestCount?: number | null;
  packageId?: number | null;
  notes?: string | null;
  selectedMascots?: number[];
  selectedActivities?: number[];
  selectedExtras?: number[];
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

export async function createBooking(payload: BookingPayload) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Rezervimi dështoi.');
  }

  return data;
}

export async function getMyBookings(customerId: number) {
  const response = await fetch(`${API_URL}/bookings/customer/${customerId}`);

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Rezervimet nuk u morën.');
  }

  return data;
}