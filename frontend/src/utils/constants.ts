export const APP_NAME = 'MD Creative Event Booking System';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const PUBLIC_ROUTES = {
  home: '/',
  decorations: '/decorations',
  mascots: '/mascots',
  activities: '/activities',
  photoBooth: '/photo-booth',
  packages: '/packages',
  gallery: '/gallery',
  team: '/our-team',
  reviews: '/reviews',
  booking: '/booking',
  signIn: '/signin',
  adminLogin: '/admin/login',
} as const;

export const ADMIN_ROUTES = {
  dashboard: '/admin/dashboard',
  bookings: '/admin/bookings',
  decorations: '/admin/decorations',
  mascots: '/admin/mascots',
  packages: '/admin/packages',
  extras: '/admin/extras',
  reviews: '/admin/reviews',
  staff: '/admin/staff',
  analytics: '/admin/analytics',
  gallery: '/admin/gallery',
} as const;

export const BOOKING_STATUS = {
  pending: 'Pending',
  approved: 'Approved',
  completed: 'Completed',
  cancelled: 'Cancelled',
} as const;

export const PAYMENT_STATUS = {
  unpaid: 'Unpaid',
  partiallyPaid: 'Partially Paid',
  paid: 'Paid',
  refunded: 'Refunded',
} as const;

export const DEFAULT_PAGE_SIZE = 10;

export const CONTACT_INFO = {
  phone: '+383 44 000 000',
  email: 'mdcreative@example.com',
  location: 'Kosovo',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  ADMIN_TOKEN: 'adminToken',
  ADMIN_USER: 'adminUser',

  // lowercase aliases
  token: 'token',
  user: 'user',
  adminToken: 'adminToken',
  adminUser: 'adminUser',
} as const;

export default {
  APP_NAME,
  API_BASE_URL,
  PUBLIC_ROUTES,
  ADMIN_ROUTES,
  BOOKING_STATUS,
  PAYMENT_STATUS,
  STORAGE_KEYS,
  DEFAULT_PAGE_SIZE,
  CONTACT_INFO,
};