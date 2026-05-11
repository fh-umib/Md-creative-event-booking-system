export const APP_NAME = 'MD Creative Event Booking System';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://md-creative-backend.onrender.com/api'
    : 'http://localhost:5000/api');

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
} as const;