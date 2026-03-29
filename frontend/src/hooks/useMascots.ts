import { useCallback, useEffect, useState } from 'react';
import { mascotService } from '../services/mascots/mascotService';
import type {
  CreateMascotRequest,
  Mascot,
  UpdateMascotRequest,
} from '../types';

export function useMascots() {
  const [mascots, setMascots] = useState<Mascot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMascots = useCallback(async (filters?: { name?: string; maxPrice?: string }) => {
    try {
      setIsLoading(true);
      setError('');
      const data = await mascotService.getAll(filters);
      setMascots(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load mascots.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createMascot = async (payload: CreateMascotRequest) => {
    const created = await mascotService.create(payload);
    setMascots((prev) => [...prev, created]);
    return created;
  };

  const updateMascot = async (id: string, payload: UpdateMascotRequest) => {
    const updated = await mascotService.update(id, payload);
    setMascots((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? updated : item))
    );
    return updated;
  };

  const deleteMascot = async (id: string) => {
    await mascotService.remove(id);
    setMascots((prev) =>
      prev.filter((item) => String(item.id) !== String(id))
    );
  };

  useEffect(() => {
    fetchMascots();
  }, [fetchMascots]);

  return {
    mascots,
    isLoading,
    error,
    fetchMascots,
    createMascot,
    updateMascot,
    deleteMascot,
  };
}