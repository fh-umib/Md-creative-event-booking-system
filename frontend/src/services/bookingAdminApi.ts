const API_BASE_URL = 'http://localhost:5000/api';

export type AdminBooking = {
id: number;
booking_code: string;
event_title: string;
event_type: string | null;
event_date: string;
start_time: string | null;
end_time: string | null;
guest_count: number;
status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
payment_status: string;
total_price: string | number;
deposit_amount: string | number;
remaining_balance: string | number;
created_at: string;
customer_name: string;
customer_email: string;
package_title: string | null;
};

export async function getAdminBookings(
search = '',
status = ''
): Promise<AdminBooking[]> {
const params = new URLSearchParams();

if (search.trim()) {
params.set('search', search.trim());
}

if (status.trim()) {
params.set('status', status.trim());
}

const query = params.toString();
const response = await fetch(
`${API_BASE_URL}/admin/bookings${query ? `?${query}` : ''}`
);

if (!response.ok) {
throw new Error('Failed to load bookings');
}

return response.json();
}

export async function getAdminBookingById(id: number): Promise<AdminBooking> {
const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`);

if (!response.ok) {
throw new Error('Failed to load booking details');
}

return response.json();
}

export async function updateAdminBookingStatus(
id: number,
status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled'
) {
const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}/status`, {
method: 'PATCH',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ status }),
});

if (!response.ok) {
const data = await response.json().catch(() => ({}));
throw new Error(data.message || 'Failed to update booking status');
}

return response.json();
}

export async function deleteAdminBooking(id: number) {
const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
method: 'DELETE',
});

if (!response.ok) {
const data = await response.json().catch(() => ({}));
throw new Error(data.message || 'Failed to delete booking');
}

return response.json();
}