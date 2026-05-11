import { API_BASE_URL } from '../utils/constants';

export function getApiBaseUrl() {
  const cleanBaseUrl = API_BASE_URL.replace(/\/$/, '');

  if (cleanBaseUrl.endsWith('/api')) {
    return cleanBaseUrl;
  }

  return `${cleanBaseUrl}/api`;
}

export const API_URL = getApiBaseUrl();