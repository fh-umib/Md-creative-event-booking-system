import { Routes } from 'react-router-dom';
import { publicRoutes } from './PublicRoutes';
import { authRoutes } from './AuthRoutes';
import { adminRoutes } from './AdminRoutes';

export default function AppRouter() {
  return (
    <Routes>
      {publicRoutes}
      {authRoutes}
      {adminRoutes}
    </Routes>
  );
}