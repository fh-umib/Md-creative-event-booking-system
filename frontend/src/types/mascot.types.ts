export interface Mascot {
  id: number | string;
  name?: string;
  character_name?: string;
  description?: string | null;
  price?: number | null;
  imageUrl?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateMascotRequest {
  name: string;
  character_name?: string;
  description?: string | null;
  price?: number;
  imageUrl?: string;
}

export interface UpdateMascotRequest {
  name?: string;
  character_name?: string;
  description?: string | null;
  price?: number;
  imageUrl?: string;
}