import { useCallback, useEffect, useState } from 'react';
import { reviewService } from '../services/reviews/reviewService';
import type {
  CreateReviewRequest,
  Review,
  UpdateReviewRequest,
} from '../types';

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = useCallback(
    async (filters?: {
      customerName?: string;
      minRating?: string;
      onlyApproved?: string;
    }) => {
      try {
        setIsLoading(true);
        setError('');
        const data = await reviewService.getAll(filters);
        setReviews(data);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load reviews.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const createReview = async (payload: CreateReviewRequest) => {
    const created = await reviewService.create(payload);
    setReviews((prev) => [...prev, created]);
    return created;
  };

  const updateReview = async (id: string, payload: UpdateReviewRequest) => {
    const updated = await reviewService.update(id, payload);
    setReviews((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? updated : item))
    );
    return updated;
  };

  const deleteReview = async (id: string) => {
    await reviewService.remove(id);
    setReviews((prev) =>
      prev.filter((item) => String(item.id) !== String(id))
    );
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    isLoading,
    error,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
  };
}