import type { PublicStaffResponse } from "../types/staff";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function getPublicStaff(): Promise<PublicStaffResponse> {
  const response = await fetch(`${API_BASE_URL}/api/public/staff`);

  if (!response.ok) {
    throw new Error("Failed to fetch staff data");
  }

  return response.json();
}