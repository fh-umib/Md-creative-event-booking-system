export function mapApiResponse<T>(response: unknown, fallback: T): T {
  if (response === null || response === undefined) {
    return fallback;
  }

  if (typeof response === 'object' && 'data' in response) {
    return (response as { data: T }).data ?? fallback;
  }

  return response as T;
}

export function mapArrayResponse<T>(response: unknown): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (
    response &&
    typeof response === 'object' &&
    'data' in response &&
    Array.isArray((response as { data?: unknown }).data)
  ) {
    return (response as { data: T[] }).data;
  }

  return [];
}

export function toNumber(value: unknown, fallback = 0): number {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return fallback;
  }

  return numericValue;
}

export function toBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }

  return Boolean(value);
}

export function toStringValue(value: unknown, fallback = ''): string {
  if (value === null || value === undefined) {
    return fallback;
  }

  return String(value);
}

export function normalizeApiItem<T extends Record<string, unknown>>(item: T): T {
  return {
    ...item,
  };
}

export default {
  mapApiResponse,
  mapArrayResponse,
  toNumber,
  toBoolean,
  toStringValue,
  normalizeApiItem,
};