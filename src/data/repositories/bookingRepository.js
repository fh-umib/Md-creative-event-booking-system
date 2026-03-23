const pool = require('../db/db');

class BookingRepository {
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM bookings ORDER BY event_date DESC, id DESC'
    );
    return result.rows;
  }

  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE id = $1 LIMIT 1',
      [id]
    );
    return result.rows[0] || null;
  }

  async create(booking, client = pool) {
    const query = `
      INSERT INTO bookings (
        booking_code, customer_id, package_id, event_title, event_type,
        event_date, start_time, end_time, venue_name, venue_address,
        guest_count, special_requests, status, payment_status,
        subtotal, discount_amount, total_price, deposit_amount,
        remaining_balance, created_by
      )
      VALUES (
        $1,$2,$3,$4,$5,
        $6,$7,$8,$9,$10,
        $11,$12,$13,$14,
        $15,$16,$17,$18,
        $19,$20
      )
      RETURNING *;
    `;
    const values = [
      booking.bookingCode,
      booking.customerId,
      booking.packageId,
      booking.eventTitle,
      booking.eventType,
      booking.eventDate,
      booking.startTime,
      booking.endTime,
      booking.venueName,
      booking.venueAddress,
      booking.guestCount,
      booking.specialRequests,
      booking.status,
      booking.paymentStatus,
      booking.subtotal,
      booking.discountAmount,
      booking.totalPrice,
      booking.depositAmount,
      booking.remainingBalance,
      booking.createdBy
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  }

  async addBookingMascot(bookingId, mascotId, quantity, unitPrice, totalPrice, client = pool) {
    const query = `
      INSERT INTO booking_mascots (booking_id, mascot_id, quantity, unit_price, total_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await client.query(query, [bookingId, mascotId, quantity, unitPrice, totalPrice]);
    return result.rows[0];
  }

  async addBookingActivity(bookingId, activityId, quantity, unitPrice, totalPrice, client = pool) {
    const query = `
      INSERT INTO booking_activities (booking_id, activity_id, quantity, unit_price, total_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await client.query(query, [bookingId, activityId, quantity, unitPrice, totalPrice]);
    return result.rows[0];
  }

  async addBookingExtra(bookingId, extraId, quantity, unitPrice, totalPrice, client = pool) {
    const query = `
      INSERT INTO booking_extras (booking_id, extra_id, quantity, unit_price, total_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await client.query(query, [bookingId, extraId, quantity, unitPrice, totalPrice]);
    return result.rows[0];
  }

  async reserveInventoryItem(bookingId, inventoryItemId, reservedQuantity, notes, client = pool) {
    const query = `
      INSERT INTO booking_inventory_items (booking_id, inventory_item_id, reserved_quantity, notes)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await client.query(query, [bookingId, inventoryItemId, reservedQuantity, notes]);
    return result.rows[0];
  }

  async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE bookings SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0] || null;
  }
}

module.exports = new BookingRepository();
