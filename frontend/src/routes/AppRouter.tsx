import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import BookingPage from "../pages/public/BookingPage";
import DecorationsPage from "../pages/public/DecorationsPage";
import MascotsPage from "../pages/public/MascotsPage";
import ActivitiesPage from "../pages/public/ActivitiesPage";
import PackagesPage from "../pages/public/PackagesPage";
import GalleryPage from "../pages/public/GalleryPage";
import StaffPage from "../pages/admin/StaffPage";
import ReviewsPage from "../pages/public/ReviewsPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminDashboardPage from "../pages/admin/DashboardPage";
import AnalyticsPage from "../pages/admin/AnalyticsPage";
import NotFoundPage from "../pages/public/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/decorations" element={<DecorationsPage />} />
      <Route path="/mascots" element={<MascotsPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/packages" element={<PackagesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}