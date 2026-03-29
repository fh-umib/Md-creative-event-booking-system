import { useCallback, useEffect, useState } from 'react';
import { packageService } from '../services/packages/packageService';
import type {
  CreatePackageRequest,
  Package,
  UpdatePackageRequest,
} from '../types';

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPackages = useCallback(async (filters?: { name?: string; maxPrice?: string }) => {
    try {
      setIsLoading(true);
      setError('');
      const data = await packageService.getAll(filters);
      setPackages(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load packages.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPackage = async (payload: CreatePackageRequest) => {
    const created = await packageService.create(payload);
    setPackages((prev) => [...prev, created]);
    return created;
  };

  const updatePackage = async (id: string, payload: UpdatePackageRequest) => {
    const updated = await packageService.update(id, payload);
    setPackages((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? updated : item))
    );
    return updated;
  };

  const deletePackage = async (id: string) => {
    await packageService.remove(id);
    setPackages((prev) =>
      prev.filter((item) => String(item.id) !== String(id))
    );
  };

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return {
    packages,
    isLoading,
    error,
    fetchPackages,
    createPackage,
    updatePackage,
    deletePackage,
  };
}