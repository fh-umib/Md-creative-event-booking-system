import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

import HomePage from './pages/public/HomePage';
import DecorationsPage from './pages/public/DecorationsPage';
import DecorationDetailPage from './pages/public/DecorationDetailPage';
import BookingPage from './pages/public/BookingPage';
import MascotsPage from './pages/public/MascotsPage';
import ActivitiesPage from './pages/public/ActivitiesPage';
import PhotoBoothPage from './pages/public/PhotoBoothPage';
import PackagesPage from './pages/public/PackagesPage';
import GalleryPage from './pages/public/GalleryPage';
import OurTeamPage from './pages/public/OurTeamPage';
import ReviewsPage from './pages/public/ReviewsPage';

import SignInPage from './pages/auth/SignInPage';
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="decorations" element={<DecorationsPage />} />
        <Route path="decorations/:slug" element={<DecorationDetailPage />} />
        <Route path="mascots" element={<MascotsPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="photo-booth" element={<PhotoBoothPage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="our-team" element={<OurTeamPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="booking" element={<BookingPage />} />
      </Route>

      <Route path="/signin" element={<SignInPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="decorations" element={<DecorationsPageAdmin />} />
        <Route path="mascots" element={<MascotsPageAdmin />} />
        <Route path="packages" element={<PackagesPageAdmin />} />
        <Route path="extras" element={<ExtrasPage />} />
        <Route path="reviews" element={<ReviewsPageAdmin />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}