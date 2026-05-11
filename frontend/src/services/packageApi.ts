import { API_URL } from './apiBase';

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
  error?: string;
  data: T;
};

async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  let result: ApiResponse<T> | null = null;

  if (text) {
    try {
      result = JSON.parse(text) as ApiResponse<T>;
    } catch {
      throw new Error(
        'Serveri nuk ktheu përgjigje JSON. Kontrollo API URL dhe backend route.',
      );
    }
  }

  if (!response.ok) {
    const message =
      result?.message ||
      result?.error ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  if (result && result.success === false) {
    throw new Error(result.message || 'Request failed');
  }

  return result as T;
}

export async function getPublicPackages(): Promise<PackageItem[]> {
  const response = await fetch(`${API_URL}/packages`);
  const result = await handleResponse<ApiResponse<PackageItem[]>>(response);

  return Array.isArray(result.data)
    ? result.data.filter((item) => item.is_active)
    : [];
}

export async function getPackageCategories(): Promise<PackageCategorySummary[]> {
  const packages = await getPublicPackages();

  const grouped = packages.reduce<Record<string, PackageItem[]>>((acc, item) => {
    if (!item.category) return acc;

    if (!acc[item.category]) {
      acc[item.category] = [];
    }

    acc[item.category].push(item);
    return acc;
  }, {});

  return Object.entries(grouped).map(([category, items]) => {
    const prices = items.map((item) => Number(item.base_price || 0));

    return {
      category,
      min_price: Math.min(...prices),
      max_price: Math.max(...prices),
      total_packages: items.length,
    };
  });
}

export async function getPackagesByCategory(
  category: string,
): Promise<PackageItem[]> {
  const packages = await getPublicPackages();

  return packages.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase(),
  );
}

export async function getPackageById(id: string): Promise<PackageItem> {
  const response = await fetch(`${API_URL}/packages/${id}`);
  const result = await handleResponse<ApiResponse<PackageItem>>(response);

  return result.data;
}