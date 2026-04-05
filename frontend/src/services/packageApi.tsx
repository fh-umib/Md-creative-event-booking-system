const API_BASE_URL = 'http://localhost:5000/api';

export type PackageItem = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  duration_minutes: number;
  min_mascots: number;
  max_mascots: number;
  base_price: string | number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export async function getPublicPackages(): Promise<PackageItem[]> {
  const response = await fetch(`${API_BASE_URL}/packages`);

  if (!response.ok) {
    throw new Error('Failed to load packages');
  }

  return response.json();
}