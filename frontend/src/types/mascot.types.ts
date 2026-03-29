export interface Mascot {
  id: number | string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface CreateMascotRequest {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface UpdateMascotRequest {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isActive?: boolean;
}