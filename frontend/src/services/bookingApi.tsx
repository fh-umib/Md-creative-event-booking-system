import { API_URL } from './apiBase';

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

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error('Formati i orës nuk është valid.');
  }

  return hours * 60 + minutes;
}

function validateBookingTimes(payload: PublicBookingPayload) {
  if (!payload.start_time || !payload.end_time) {
    throw new Error('Ju lutem plotësoni orën e fillimit dhe orën e përfundimit.');
  }

  const startMinutes = timeToMinutes(payload.start_time);
  const endMinutes = timeToMinutes(payload.end_time);

  if (endMinutes <= startMinutes) {
    throw new Error('Ora e përfundimit duhet të jetë më vonë se ora e fillimit.');
  }
}

export async function createPublicBooking(payload: PublicBookingPayload) {
  validateBookingTimes(payload);

  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      package_id: payload.package_id === '' ? null : payload.package_id,
    }),
  });

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to create booking');
  }

  return data;
}