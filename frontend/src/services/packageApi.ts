const API_BASE_URL = 'http://localhost:5000/api/packages';

export type PackageCategorySummary = {
  category: string;
  min_price: number;
  max_price: number;
  total_packages: number;
};

export type PackageItem = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  duration_minutes: number;
  min_mascots: number;
  max_mascots: number;
  base_price: number;
  is_active: boolean;
  extras?: string[];
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }

  return response.json();
}

export async function getPublicPackages(): Promise<PackageItem[]> {
  const response = await fetch(API_BASE_URL);
  const result = await handleResponse<ApiResponse<PackageItem[]>>(response);

  return Array.isArray(result.data)
    ? result.data.filter((item) => item.is_active)
    : [];
}

export async function getPackageCategories(): Promise<PackageCategorySummary[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  const result = await handleResponse<ApiResponse<PackageCategorySummary[]>>(response);

  return Array.isArray(result.data) ? result.data : [];
}

export async function getPackagesByCategory(category: string): Promise<PackageItem[]> {
  const response = await fetch(`${API_BASE_URL}/category/${category}`);
  const result = await handleResponse<ApiResponse<PackageItem[]>>(response);

  return Array.isArray(result.data) ? result.data : [];
}

export async function getPackageById(id: string): Promise<PackageItem> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  const result = await handleResponse<ApiResponse<PackageItem>>(response);
  return result.data;
}