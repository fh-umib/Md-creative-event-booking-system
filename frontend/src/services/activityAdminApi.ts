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

export type ActivityPayload = {
name: string;
description: string;
price: number;
duration_minutes: number;
is_active: boolean;
};

export async function getAdminActivities(): Promise<Activity[]> {
const response = await fetch(`${API_BASE_URL}/admin/activities`);

if (!response.ok) {
throw new Error('Failed to load activities');
}

return response.json();
}

export async function createActivity(payload: ActivityPayload): Promise<Activity> {
const response = await fetch(`${API_BASE_URL}/admin/activities`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(payload),
});

if (!response.ok) {
const data = await response.json().catch(() => ({}));
throw new Error(data.message || 'Failed to create activity');
}

return response.json();
}

export async function updateActivity(
id: number,
payload: ActivityPayload
): Promise<Activity> {
const response = await fetch(`${API_BASE_URL}/admin/activities/${id}`, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(payload),
});

if (!response.ok) {
const data = await response.json().catch(() => ({}));
throw new Error(data.message || 'Failed to update activity');
}

return response.json();
}

export async function deleteActivity(id: number): Promise<Activity> {
const response = await fetch(`${API_BASE_URL}/admin/activities/${id}`, {
method: 'DELETE',
});

if (!response.ok) {
const data = await response.json().catch(() => ({}));
throw new Error(data.message || 'Failed to delete activity');
}

return response.json();
}
