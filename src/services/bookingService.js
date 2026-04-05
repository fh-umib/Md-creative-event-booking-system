const pool = require('../data/config/db');

function generateBookingCode() {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `MD-${randomPart}`;
}

class BookingService {
  async createBooking(payload) {
    const {
      full_name,
      email,
      phone,
      event_title,
      event_type,
      event_date,
      start_time,
      end_time,
      venue_name,
      venue_address,
      guest_count,
      special_requests,
      package_id,
    } = payload;

    if (!full_name?.trim()) {
      throw new Error('Full name is required.');
    }

    if (!email?.trim()) {
      throw new Error('Email is required.');
    }

    if (!event_title?.trim()) {
      throw new Error('Event title is required.');
    }

    if (!event_date) {
      throw new Error('Event date is required.');
    }

    const clientQuery = `
      INSERT INTO users (
        full_name,
        email,
        password_hash,
        phone,
        role,
        is_active
      )
      VALUES ($1, $2, $3, $4, 'Client', TRUE)
      ON CONFLICT (email)
      DO UPDATE SET
        full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone
      RETURNING id
    `;

    const clientValues = [
      full_name.trim(),
      email.trim().toLowerCase(),
      'public-booking-no-password',
      phone?.trim() || null,
    ];

    const clientResult = await pool.query(clientQuery, clientValues);
    const customerId = clientResult.rows[0].id;

    const bookingCode = generateBookingCode();

    const packagePriceQuery = `
      SELECT id, base_price
      FROM packages
      WHERE id = $1
      LIMIT 1
    `;

    let subtotal = 0;
    let validPackageId = null;

    if (package_id) {
      const packageResult = await pool.query(packagePriceQuery, [package_id]);

      if (packageResult.rows[0]) {
        validPackageId = packageResult.rows[0].id;
        subtotal = Number(packageResult.rows[0].base_price || 0);
      }
    }

    const totalPrice = subtotal;
    const depositAmount = 0;
    const remainingBalance = totalPrice;

    const bookingQuery = `
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
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, 'Pending', 'Unpaid', $13, 0, $14, $15, $16, NULL
      )
      RETURNING *
    `;

    const bookingValues = [
      bookingCode,
      customerId,
      validPackageId,
      event_title.trim(),
      event_type?.trim() || null,
      event_date,
      start_time || null,
      end_time || null,
      venue_name?.trim() || null,
      venue_address?.trim() || null,
      Number(guest_count || 0),
      special_requests?.trim() || null,
      subtotal,
      totalPrice,
      depositAmount,
      remainingBalance,
    ];

    const bookingResult = await pool.query(bookingQuery, bookingValues);
    return bookingResult.rows[0];
  }
}

module.exports = new BookingService();