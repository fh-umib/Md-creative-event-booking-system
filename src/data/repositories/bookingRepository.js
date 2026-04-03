const pool = require('../config/db');

class BookingRepository {
  async getAll(filters = {}) {
    const values = [];
    const conditions = [];
    let index = 1;

    if (filters.status) {
      conditions.push(`b.status = $${index++}`);
      values.push(filters.status);
    }

    if (filters.paymentStatus) {
      conditions.push(`b.payment_status = $${index++}`);
      values.push(filters.paymentStatus);
    }

    if (filters.customerId) {
      conditions.push(`b.customer_id = $${index++}`);
      values.push(filters.customerId);
    }

    if (filters.packageId) {
      conditions.push(`b.package_id = $${index++}`);
      values.push(filters.packageId);
    }

    if (filters.eventDate) {
      conditions.push(`b.event_date = $${index++}`);
      values.push(filters.eventDate);
    }

    if (filters.category) {
      conditions.push(`LOWER(COALESCE(p.category, '')) = LOWER($${index++})`);
      values.push(filters.category);
    }

    if (filters.search) {
      conditions.push(`(
        LOWER(b.booking_code) LIKE LOWER($${index})
        OR LOWER(b.event_title) LIKE LOWER($${index})
        OR LOWER(COALESCE(u.full_name, '')) LIKE LOWER($${index})
      )`);
      values.push(`%${filters.search}%`);
      index++;
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT
        b.id,
        b.booking_code,
        b.customer_id,
        b.package_id,
        b.event_title,
        b.event_type,
        b.event_date,
        b.start_time,
        b.end_time,
        b.venue_name,
        b.venue_address,
        b.guest_count,
        b.special_requests,
        b.status,
        b.payment_status,
        b.subtotal,
        b.discount_amount,
        b.total_price,
        b.deposit_amount,
        b.remaining_balance,
        b.created_by,
        b.created_at,
        b.updated_at,
        u.full_name AS customer_name,
        u.email AS customer_email,
        u.phone AS customer_phone,
        p.title AS package_title,
        p.category AS package_category
      FROM bookings b
      LEFT JOIN users u ON u.id = b.customer_id
      LEFT JOIN packages p ON p.id = b.package_id
      ${whereClause}
      ORDER BY b.created_at DESC
    `;

    const { rows } = await pool.query(query, values);
    return rows;
  }

  async getById(id) {
    const query = `
      SELECT
        b.id,
        b.booking_code,
        b.customer_id,
        b.package_id,
        b.event_title,
        b.event_type,
        b.event_date,
        b.start_time,
        b.end_time,
        b.venue_name,
        b.venue_address,
        b.guest_count,
        b.special_requests,
        b.status,
        b.payment_status,
        b.subtotal,
        b.discount_amount,
        b.total_price,
        b.deposit_amount,
        b.remaining_balance,
        b.created_by,
        b.created_at,
        b.updated_at,
        u.full_name AS customer_name,
        u.email AS customer_email,
        u.phone AS customer_phone,
        p.title AS package_title,
        p.category AS package_category
      FROM bookings b
      LEFT JOIN users u ON u.id = b.customer_id
      LEFT JOIN packages p ON p.id = b.package_id
      WHERE b.id = $1
      LIMIT 1
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async getByCode(bookingCode) {
    const query = `
      SELECT *
      FROM bookings
      WHERE booking_code = $1
      LIMIT 1
    `;

    const { rows } = await pool.query(query, [bookingCode]);
    return rows[0] || null;
  }

  async create(data) {
    const query = `
      INSERT INTO bookings (
        booking_code,
        customer_id,
        package_id,
        event_title,
        event_type,
        event_date,
        start_time,
        end_time,
        venue_name,
        venue_address,
        guest_count,
        special_requests,
        status,
        payment_status,
        subtotal,
        discount_amount,
        total_price,
        deposit_amount,
        remaining_balance,
        created_by
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20
      )
      RETURNING *
    `;

    const values = [
      data.bookingCode,
      data.customerId,
      data.packageId ?? null,
      data.eventTitle,
      data.eventType ?? null,
      data.eventDate,
      data.startTime ?? null,
      data.endTime ?? null,
      data.venueName ?? null,
      data.venueAddress ?? null,
      data.guestCount ?? 0,
      data.specialRequests ?? null,
      data.status ?? 'Pending',
      data.paymentStatus ?? 'Unpaid',
      data.subtotal ?? 0,
      data.discountAmount ?? 0,
      data.totalPrice ?? 0,
      data.depositAmount ?? 0,
      data.remainingBalance ?? 0,
      data.createdBy ?? null,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async updateStatus(id, status) {
    const query = `
      UPDATE bookings
      SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const { rows } = await pool.query(query, [status, id]);
    return rows[0] || null;
  }

  async updatePaymentStatus(id, paymentStatus) {
    const query = `
      UPDATE bookings
      SET
        payment_status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const { rows } = await pool.query(query, [paymentStatus, id]);
    return rows[0] || null;
  }

  async delete(id) {
    const query = `
      DELETE FROM bookings
      WHERE id = $1
      RETURNING id
    `;

    const { rows } = await pool.query(query, [id]);
    return Boolean(rows[0]);
  }
}

module.exports = new BookingRepository();