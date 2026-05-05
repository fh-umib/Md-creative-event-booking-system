export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  PACKAGES: {
    BASE: '/packages',
    BY_ID: (id: number | string) => `/packages/${id}`,
    CATEGORIES: '/packages/categories',
  },

  MASCOTS: {
    BASE: '/mascots',
    BY_ID: (id: number | string) => `/mascots/${id}`,
  },

  REVIEWS: {
    BASE: '/reviews',
    BY_ID: (id: number | string) => `/reviews/${id}`,
  },

  BOOKINGS: {
    BASE: '/bookings',
    BY_ID: (id: number | string) => `/bookings/${id}`,
    STATUS: (id: number | string) => `/bookings/${id}/status`,
    PAYMENT_STATUS: (id: number | string) => `/bookings/${id}/payment-status`,
  },

  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    BOOKINGS: '/admin/bookings',
    PACKAGES: '/admin/packages',
    MASCOTS: '/admin/mascots',
    REVIEWS: '/admin/reviews',
    DECORATIONS: '/admin/decorations',
    GALLERY: '/admin/gallery',
    STAFF: '/admin/staff',
  },

  // lowercase aliases, in case any newer file uses lowercase names
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },

  packages: {
    base: '/packages',
    byId: (id: number | string) => `/packages/${id}`,
    categories: '/packages/categories',
  },

  mascots: {
    base: '/mascots',
    byId: (id: number | string) => `/mascots/${id}`,
  },

  reviews: {
    base: '/reviews',
    byId: (id: number | string) => `/reviews/${id}`,
  },

  bookings: {
    base: '/bookings',
    byId: (id: number | string) => `/bookings/${id}`,
    status: (id: number | string) => `/bookings/${id}/status`,
    paymentStatus: (id: number | string) => `/bookings/${id}/payment-status`,
  },

  admin: {
    dashboard: '/admin/dashboard',
    bookings: '/admin/bookings',
    packages: '/admin/packages',
    mascots: '/admin/mascots',
    reviews: '/admin/reviews',
    decorations: '/admin/decorations',
    gallery: '/admin/gallery',
    staff: '/admin/staff',
  },
} as const;

export default API_ENDPOINTS;