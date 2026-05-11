import { API_URL } from '../apiBase';

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

export async function getBookingCategories() {
  const response = await fetch(`${API_URL}/booking-flow/categories`);

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Kategoritë nuk u morën.');
  }

  return data;
}

export async function getPackagesByCategory(category: string) {
  const response = await fetch(
    `${API_URL}/booking-flow/packages/${encodeURIComponent(category)}`,
  );

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Paketat nuk u morën.');
  }

  return data;
}

export async function getBookingCustomization(packageId: number) {
  const response = await fetch(`${API_URL}/booking-flow/customization/${packageId}`);

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Opsionet e rezervimit nuk u morën.');
  }

  return data;
}