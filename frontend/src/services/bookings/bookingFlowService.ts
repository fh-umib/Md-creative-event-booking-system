import type {
  BookingCategoryKey,
  BookingCategoryOption,
  BookingCustomizationConfig,
  BookingFlowConfiguration,
  Package,
} from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function handleResponse<T>(response: Response): Promise<T> {
  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message || 'Request failed.');
  }

  return json.data as T;
}

export const bookingFlowService = {
  async getCategories(): Promise<BookingCategoryOption[]> {
    const response = await fetch(`${API_BASE_URL}/booking-flow/categories`);
    return handleResponse<BookingCategoryOption[]>(response);
  },

  async getPackagesByCategory(category: BookingCategoryKey): Promise<Package[]> {
    const response = await fetch(`${API_BASE_URL}/booking-flow/packages/${category}`);
    return handleResponse<Package[]>(response);
  },

  async getCustomizationConfig(
    category: BookingCategoryKey
  ): Promise<BookingCustomizationConfig> {
    const response = await fetch(
      `${API_BASE_URL}/booking-flow/customization/${category}`
    );
    return handleResponse<BookingCustomizationConfig>(response);
  },

  async getFlowConfiguration(
    category?: BookingCategoryKey
  ): Promise<BookingFlowConfiguration> {
    const query = category ? `?category=${category}` : '';
    const response = await fetch(`${API_BASE_URL}/booking-flow/configuration${query}`);
    return handleResponse<BookingFlowConfiguration>(response);
  },
};