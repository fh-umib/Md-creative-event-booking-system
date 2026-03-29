import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import BookingsPage from '../pages/admin/BookingsPage';
import PackagesPage from '../pages/admin/PackagesPage';
import MascotsPage from '../pages/admin/MascotsPage';
import ReviewsPage from '../pages/admin/ReviewsPage';
import StaffPage from '../pages/admin/StaffPage';

export const adminRoutes = (
  <Route element={<ProtectedRoute allowedRoles={['admin', 'staff']} />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/bookings" element={<BookingsPage />} />
      <Route path="/admin/packages" element={<PackagesPage />} />
      <Route path="/admin/mascots" element={<MascotsPage />} />
      <Route path="/admin/reviews" element={<ReviewsPage />} />
      <Route path="/admin/staff" element={<StaffPage />} />
    </Route>
  </Route>
);