export interface Review {
  id: number | string;
  customerName: string;
  comment: string;
  rating: number;
  isApproved?: boolean;
}

export interface CreateReviewRequest {
  customerName: string;
  comment: string;
  rating: number;
  isApproved?: boolean;
}

export interface UpdateReviewRequest {
  customerName: string;
  comment: string;
  rating: number;
  isApproved?: boolean;
}