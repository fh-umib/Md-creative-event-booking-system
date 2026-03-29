import { Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import HomePage from '../pages/public/HomePage';
import PackagesPage from '../pages/public/PackagesPage';
import MascotsPage from '../pages/public/MascotsPage';
import BookingPage from '../pages/public/BookingPage';
import ReviewsPage from '../pages/public/ReviewsPage';
import NotFoundPage from '../pages/public/NotFoundPage';

export const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/packages" element={<PackagesPage />} />
    <Route path="/mascots" element={<MascotsPage />} />
    <Route path="/booking" element={<BookingPage />} />
    <Route path="/reviews" element={<ReviewsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);