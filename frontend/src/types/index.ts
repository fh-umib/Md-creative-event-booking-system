export type {
  Package,
  CreatePackageRequest,
  UpdatePackageRequest,
} from './package.types';

export type {
  Mascot,
  CreateMascotRequest,
  UpdateMascotRequest,
} from './mascot.types';

export type {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from './review.types';

export type {
  BookingStatus,
  PaymentStatus,
  BookingDetailsForm,
  BookingItemInput,
  CreateBookingPayload,
  BookingRecord,
} from './booking.types';

export type {
  BookingCategoryKey,
  BookingFlowStepKey,
  BookingCategoryOption,
  BookingFlowStep,
  BookingCustomizationSection,
  BookingCustomizationConfig,
  BookingFlowConfiguration,
  BookingCustomizationSelections,
} from './booking-flow.types';

export type {
  AdminBookingStats,
  AdminBookingFilters,
  AdminBookingListResponse,
} from './booking-admin.types';


export type Booking = {
  id: number;
  bookingCode?: string;
  customerName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  packageId?: number;
  packageTitle?: string;
  eventTitle?: string;
  eventType?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  venueName?: string;
  venueAddress?: string;
  guestCount?: number;
  specialRequests?: string;
  status?: string;
  paymentStatus?: string;
  totalPrice?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateBookingRequest = {
  fullName?: string;
  customerName?: string;
  email: string;
  phone?: string;
  packageId?: number | string;
  eventTitle?: string;
  eventType?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  venueName?: string;
  venueAddress?: string;
  guestCount?: number | string;
  specialRequests?: string;
};

export type DashboardStats = {
  totalBookings: number;

  totalRevenue?: number;
  activePackages?: number;
  totalClients?: number;

  totalPackages?: number;
  totalMascots?: number;
  totalReviews?: number;
  upcomingEvents?: number;
  pendingBookings?: number;
  approvedBookings?: number;
  completedBookings?: number;
};