import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import DecorationsPage from "../pages/DecorationsPage";
import MascotsPage from "../pages/MascotsPage";
import ActivitiesPage from "../pages/ActivitiesPage";
import PackagesPage from "../pages/PackagesPage";
import GalleryPage from "../pages/GalleryPage";
import StaffPage from "../pages/StaffPage";
import ReviewsPage from "../pages/ReviewsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import NotFoundPage from "../pages/NotFoundPage";

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