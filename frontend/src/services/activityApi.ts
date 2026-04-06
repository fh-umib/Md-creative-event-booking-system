const API_BASE_URL = 'http://localhost:5000/api';

export type Activity = {
  id: number;
  name: string;
  description: string | null;
  price: string | number;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
};

export async function getPublicActivities(): Promise<Activity[]> {
  const response = await fetch(`${API_BASE_URL}/activities`);

  if (!response.ok) {
    throw new Error('Failed to load activities');
  }

  return response.json();
}