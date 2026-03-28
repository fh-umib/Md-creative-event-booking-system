const API_URL = "http://localhost:5000/api/mascots";

export type Mascot = {
  id: number;
  name: string;
  characterName: string;
  theme: string | null;
  description: string;
  price: number;
  durationMinutes: number;
  minAge: number | null;
  maxAge: number | null;
  isAvailable: boolean;
  image: string;
};

export type MascotPayload = {
  name: string;
  characterName: string;
  theme?: string | null;
  description?: string;
  price: number;
  durationMinutes?: number;
  minAge?: number | null;
  maxAge?: number | null;
  isAvailable?: boolean;
  image?: string;
};

export async function getMascots(filter?: {
  isAvailable?: string;
  theme?: string;
  characterName?: string;
}): Promise<Mascot[]> {
  const query = new URLSearchParams();

  if (filter?.isAvailable) query.append("isAvailable", filter.isAvailable);
  if (filter?.theme) query.append("theme", filter.theme);
  if (filter?.characterName) query.append("characterName", filter.characterName);

  const response = await fetch(
    `${API_URL}${query.toString() ? `?${query.toString()}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch mascots");
  }

  return response.json();
}

export async function createMascot(payload: MascotPayload): Promise<Mascot> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create mascot");
  }

  return data;
}

export async function updateMascot(
  id: number,
  payload: Partial<MascotPayload>
): Promise<Mascot> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update mascot");
  }

  return data;
}

export async function deleteMascot(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete mascot");
  }
}