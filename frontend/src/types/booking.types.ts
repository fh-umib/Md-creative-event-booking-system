export type BookingStatus = 'Pending' | 'Approved' | 'Completed' | 'Cancelled';

export type PaymentStatus =
  | 'Unpaid'
  | 'Partially Paid'
  | 'Paid'
  | 'Refunded';

export interface BookingDetailsForm {
  customerId?: number | null;
  fullName: string;
  phone: string;
  email: string;
  eventTitle: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  venueName: string;
  venueAddress: string;
  guestCount: number;
  specialRequests: string;
}

export interface BookingItemInput {
  itemId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateBookingPayload {
  customerId: number;
  packageId: number;
  category: string;
  eventTitle: string;
  eventType?: string | null;
  eventDate: string;
  startTime?: string | null;
  endTime?: string | null;
  venueName: string;
  venueAddress?: string | null;
  guestCount?: number;
  specialRequests?: string | null;
  discountAmount?: number;
  depositAmount?: number;
  createdBy?: number | null;
  mascots?: BookingItemInput[];
  activities?: BookingItemInput[];
  extras?: BookingItemInput[];
}

export interface BookingRecord {
  id: number;
  booking_code: string;
  customer_id: number;
  package_id: number | null;
  event_title: string;
  event_type: string | null;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  venue_name: string | null;
  venue_address: string | null;
  guest_count: number;
  special_requests: string | null;
  status: BookingStatus;
  payment_status: PaymentStatus;
  subtotal: number;
  discount_amount: number;
  total_price: number;
  deposit_amount: number;
  remaining_balance: number;
  created_by: number | null;
  created_at: string;
  updated_at: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  package_title?: string;
  package_category?: string;
  items?: {
    mascots: BookingItemInput[];
    activities: BookingItemInput[];
    extras: BookingItemInput[];
  };
}