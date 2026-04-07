export interface StaffMember {
  id: number;
  full_name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface StaffStats {
  total_members: number;
  avg_rating: number;
  total_reviews: number;
}

export interface StaffReview {
  id: number;
  staff_id: number;
  customer_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
  staff_name: string;
  staff_role: string;
}

export interface PublicStaffResponse {
  staff: StaffMember[];
  stats: StaffStats;
  reviews: StaffReview[];
}