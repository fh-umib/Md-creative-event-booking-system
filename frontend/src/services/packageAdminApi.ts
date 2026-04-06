const API_BASE_URL = 'http://localhost:5000/api';

export type AdminPackage = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  duration_minutes: number;
  min_mascots: number;
  max_mascots: number;
  base_price: string | number;
  is_active: boolean;
  extras: string[];
};

export type AdminPackagePayload = {
  title: string;
  description: string;
  category: string;
  duration_minutes: number;
  min_mascots: number;
  max_mascots: number;
  base_price: number;
  is_active: boolean;
};

export async function getAdminPackages(search = ''): Promise<AdminPackage[]> {
  const response = await fetch(
    `${API_BASE_URL}/admin/packages?search=${encodeURIComponent(search)}`
  );
  if (!response.ok) throw new Error('Failed to load admin packages');
  return response.json();
}

export async function createPackage(payload: AdminPackagePayload): Promise<AdminPackage> {
  const response = await fetch(`${API_BASE_URL}/admin/packages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Failed to create package');
  return response.json();
}

export async function updatePackage(
  id: number,
  payload: AdminPackagePayload
): Promise<AdminPackage> {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Failed to update package');
  return response.json();
}

export async function deletePackage(id: number): Promise<AdminPackage> {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete package');
  return response.json();
}
