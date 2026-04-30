import { Navigate, Route, Routes } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';

import HomePage from './pages/public/HomePage';
import DecorationsPage from './pages/public/DecorationsPage';
import DecorationCategoryPage from './pages/public/DecorationCategoryPage';
import DecorationDetailPage from './pages/public/DecorationDetailPage';
import BookingPage from './pages/public/BookingPage';
import MascotsPage from './pages/public/MascotsPage';
import ActivitiesPage from './pages/public/ActivitiesPage';
import PhotoBoothPage from './pages/public/PhotoBoothPage';
import PackagesPage from './pages/public/PackagesPage';
import PackageCategoryPage from './pages/public/PackageCategoryPage';
import PackageDetailPage from './pages/public/PackageDetailPage';
import GalleryPage from './pages/public/GalleryPage';
import OurTeamPage from './pages/public/OurTeamPage';
import ReviewsPage from './pages/public/ReviewsPage';

import SignInPage from './pages/auth/SignInPage';
import RegisterPage from './pages/auth/RegisterPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';

import DashboardPage from './pages/admin/DashboardPage';
import BookingsPage from './pages/admin/BookingsPage';
import DecorationsPageAdmin from './pages/admin/DecorationsPage';
import ExtrasPage from './pages/admin/ExtrasPage';
import MascotsPageAdmin from './pages/admin/MascotsPage';
import PackagesPageAdmin from './pages/admin/PackagesPage';
import ReviewsPageAdmin from './pages/admin/ReviewsPage';
import StaffPage from './pages/admin/StaffPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import GalleryAdminPage from './pages/admin/GalleryPage';

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />

        {/* DECORATIONS ROUTES */}
        <Route path="decorations" element={<DecorationsPage />} />
        <Route path="decorations/:categorySlug" element={<DecorationCategoryPage />} />
        <Route
          path="decorations/:categorySlug/:styleSlug"
          element={<DecorationDetailPage />}
        />

        {/* PUBLIC PAGES */}
        <Route path="mascots" element={<MascotsPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="photo-booth" element={<PhotoBoothPage />} />

        {/* PACKAGES ROUTES */}
        <Route path="packages" element={<PackagesPage />} />

        {/* Detail route duhet me qenë para packages/:category */}
        <Route path="packages/details/:id" element={<PackageDetailPage />} />

        {/* Category route për /packages/bounce-house, /packages/decorations, etj. */}
        <Route path="packages/:category" element={<PackageCategoryPage />} />

        <Route path="gallery" element={<GalleryPage />} />
        <Route path="our-team" element={<OurTeamPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="booking" element={<BookingPage />} />
      </Route>

      {/* AUTH ROUTES */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* ADMIN PROTECTED ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="decorations" element={<DecorationsPageAdmin />} />
          <Route path="mascots" element={<MascotsPageAdmin />} />
          <Route path="packages" element={<PackagesPageAdmin />} />
          <Route path="extras" element={<ExtrasPage />} />
          <Route path="reviews" element={<ReviewsPageAdmin />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="gallery" element={<GalleryAdminPage />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}