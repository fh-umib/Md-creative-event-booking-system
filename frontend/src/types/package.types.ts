export interface Package {
  id: number | string;
  title?: string;
  name?: string;
  description?: string | null;
  category?: string | null;
  duration_minutes?: number | null;
  duration?: number | null;
  min_mascots?: number | null;
  max_mascots?: number | null;
  base_price?: number | null;
  price?: number | null;
  is_active?: boolean;
  imageUrl?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePackageRequest {
  title: string;
  description?: string | null;
  category?: string | null;
  durationMinutes?: number;
  minMascots?: number;
  maxMascots?: number;
  basePrice?: number;
  isActive?: boolean;
}

export interface UpdatePackageRequest {
  title?: string;
  description?: string | null;
  category?: string | null;
  durationMinutes?: number;
  minMascots?: number;
  maxMascots?: number;
  basePrice?: number;
  isActive?: boolean;
}