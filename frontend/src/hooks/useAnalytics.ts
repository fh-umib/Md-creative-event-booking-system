import { useEffect, useState } from 'react';
import { analyticsService } from '../services/analytics/analyticsService';
import type { DashboardStats } from '../types';

console.log('ANALYTICS SERVICE LOADED');

export function useAnalytics() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalPackages: 0,
    totalMascots: 0,
    totalReviews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await analyticsService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load dashboard stats.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
  };
}