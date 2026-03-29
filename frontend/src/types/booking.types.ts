export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventLocation?: string;
  notes?: string;
  status: BookingStatus;
  totalPrice?: number;
  packageId?: string;
  mascotIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookingRequest {
  fullName: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventLocation?: string;
  notes?: string;
  packageId?: string;
  mascotIds?: string[];
}

export interface UpdateBookingStatusRequest {
  status: BookingStatus;
}