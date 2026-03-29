export interface Package {
  id: number | string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface CreatePackageRequest {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface UpdatePackageRequest {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isActive?: boolean;
}