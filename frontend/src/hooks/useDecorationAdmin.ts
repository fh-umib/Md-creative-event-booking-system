import { useMemo, useState } from 'react';
import {
  adminDecorationsMock,
  type AdminDecorationItem,
  type AdminDecorationStatus,
} from '../data/adminDecorations';

interface DecorationAdminFilters {
  search: string;
  status: 'all' | AdminDecorationStatus;
  category: string;
}

export function useDecorationAdmin() {
  const [items] = useState<AdminDecorationItem[]>(adminDecorationsMock);
  const [selectedItem, setSelectedItem] = useState<AdminDecorationItem | null>(null);
  const [filters, setFilters] = useState<DecorationAdminFilters>({
    search: '',
    status: 'all',
    category: 'all',
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !filters.search ||
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.style.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === 'all' ? true : item.status === filters.status;

      const matchesCategory =
        filters.category === 'all' ? true : item.category === filters.category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [items, filters]);

  const stats = useMemo(() => {
    const total = items.length;
    const active = items.filter((item) => item.status === 'active').length;
    const draft = items.filter((item) => item.status === 'draft').length;
    const categories = new Set(items.map((item) => item.category)).size;

    return { total, active, draft, categories };
  }, [items]);

  const categories = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.category)));
  }, [items]);

  return {
    items: filteredItems,
    selectedItem,
    filters,
    stats,
    categories,
    setSelectedItem,
    setFilters,
  };
}