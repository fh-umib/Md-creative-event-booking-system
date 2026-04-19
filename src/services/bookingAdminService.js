const pool = require('../data/config/db');

function createHttpError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

class BookingAdminService {
  async getAllBookings(filters = {}) {
    const { search = '', status = '' } = filters;

    let query = `
      SELECT
        b.id,
        b.booking_code,
        b.event_title,
        b.event_type,
        b.event_date,
        b.start_time,
        b.end_time,
        b.guest_count,
        b.status,
        b.payment_status,
        b.total_price,
        b.deposit_amount,
        b.remaining_balance,
        b.created_at,
        b.venue_name,
        b.venue_address,
        b.special_requests,
        u.full_name AS customer_name,
        u.email AS customer_email,
        u.phone AS customer_phone,
        p.title AS package_title
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      LEFT JOIN packages p ON b.package_id = p.id
      WHERE 1=1
    `;

    const values = [];
    let index = 1;

    if (String(search).trim()) {
      query += `
        AND (
          LOWER(b.booking_code) LIKE LOWER($${index})
          OR LOWER(b.event_title) LIKE LOWER($${index})
          OR LOWER(u.full_name) LIKE LOWER($${index})
          OR LOWER(u.email) LIKE LOWER($${index})
          OR LOWER(COALESCE(p.title, '')) LIKE LOWER($${index})
        )
      `;
      values.push(`%${String(search).trim()}%`);
      index++;
    }

    if (String(status).trim()) {
      query += ` AND b.status = $${index}`;
      values.push(String(status).trim());
      index++;
    }

    query += ` ORDER BY b.event_date DESC, b.start_time DESC NULLS LAST`;

    const { rows } = await pool.query(query, values);
    return rows;
  }

  async getBookingById(id) {
    const query = `
      SELECT
        b.*,
        u.full_name AS customer_name,
        u.email AS customer_email,
        u.phone AS customer_phone,
        p.title AS package_title
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      LEFT JOIN packages p ON b.package_id = p.id
      WHERE b.id = $1
      LIMIT 1
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async updateBookingStatus(id, status) {
    const allowedStatuses = ['Pending', 'Approved', 'Completed', 'Cancelled'];

    if (!allowedStatuses.includes(status)) {
      throw createHttpError('Invalid booking status.', 400);
    }

    const query = `
      UPDATE bookings
      SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const { rows } = await pool.query(query, [status, id]);

    if (!rows[0]) {
      throw createHttpError('Booking not found.', 404);
    }

    return rows[0];
  }

  async updateBookingPaymentStatus(id, paymentStatus) {
    const allowedPaymentStatuses = [
      'Unpaid',
      'Partially Paid',
      'Paid',
      'Refunded',
    ];

    if (!allowedPaymentStatuses.includes(paymentStatus)) {
      throw createHttpError('Invalid payment status.', 400);
    }

    const query = `
      UPDATE bookings
      SET
        payment_status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const { rows } = await pool.query(query, [paymentStatus, id]);

    if (!rows[0]) {
      throw createHttpError('Booking not found.', 404);
    }

    return rows[0];
  }

  async deleteBooking(id) {
    const query = `
      DELETE FROM bookings
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await pool.query(query, [id]);

    if (!rows[0]) {
      throw createHttpError('Booking not found.', 404);
    }

    return rows[0];
  }
}

module.exports = new BookingAdminService();