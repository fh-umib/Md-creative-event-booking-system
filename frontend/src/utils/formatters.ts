export function formatCurrency(value: number | string | null | undefined): string {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '€0.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(numericValue);
}

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) {
    return 'Not specified';
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) {
    return 'Not specified';
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatTime(value: string | null | undefined): string {
  if (!value) {
    return 'Not specified';
  }

  return value.slice(0, 5);
}

export function formatStatusLabel(value: string | null | undefined): string {
  if (!value) {
    return 'Unknown';
  }

  return value
    .replace(/[-_]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function formatCategoryLabel(value: string | null | undefined): string {
  return formatStatusLabel(value);
}

export function truncateText(text: string | null | undefined, maxLength = 120): string {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

export default {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatTime,
  formatStatusLabel,
  formatCategoryLabel,
  truncateText,
};