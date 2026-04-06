const API_BASE_URL = 'http://localhost:5000/api';

export type Mascot = {
id: number;
name: string;
character_name: string;
theme: string | null;
description: string | null;
price: string | number;
duration_minutes: number;
min_age: number | null;
max_age: number | null;
is_available: boolean;
created_at: string;
updated_at: string;
};

export async function getPublicMascots(): Promise<Mascot[]> {
const response = await fetch(`${API_BASE_URL}/mascots`);

if (!response.ok) {
throw new Error('Failed to load mascots');
}

return response.json();
}

