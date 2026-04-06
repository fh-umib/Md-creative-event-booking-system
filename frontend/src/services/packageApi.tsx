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

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }

  return response.json();
}

export async function getPublicPackages(): Promise<PackageItem[]> {
  const response = await fetch(API_BASE_URL);
  const data = await handleResponse<PackageItem[]>(response);
  return data.filter((item) => item.is_active);
}

export async function getPackageCategories(): Promise<PackageCategorySummary[]> {
  const packages = await getPublicPackages();

  const grouped = packages.reduce<Record<string, PackageItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return Object.entries(grouped).map(([category, items]) => ({
    category,
    min_price: Math.min(...items.map((item) => Number(item.base_price))),
    max_price: Math.max(...items.map((item) => Number(item.base_price))),
    total_packages: items.length,
  }));
}

export async function getPackagesByCategory(category: string): Promise<PackageItem[]> {
  const packages = await getPublicPackages();
  return packages.filter((item) => item.category === category);
}

export async function getPackageById(id: string): Promise<PackageItem> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return handleResponse<PackageItem>(response);
}