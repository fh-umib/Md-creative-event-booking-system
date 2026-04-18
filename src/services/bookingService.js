const pool = require('../data/config/db');

function generateBookingCode() {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `MD-${randomPart}`;
}

function createHttpError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidDate(value) {
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

function isPositiveInteger(value) {
  const numericValue = Number(value);
  return Number.isInteger(numericValue) && numericValue > 0;
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

    if (!full_name || !String(full_name).trim()) {
      throw createHttpError('Full name is required.', 400);
    }

    if (!email || !String(email).trim()) {
      throw createHttpError('Email is required.', 400);
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      throw createHttpError('A valid email address is required.', 400);
    }

    if (!phone || !String(phone).trim()) {
      throw createHttpError('Phone number is required.', 400);
    }

    if (!event_title || !String(event_title).trim()) {
      throw createHttpError('Event title is required.', 400);
    }

    if (!event_date) {
      throw createHttpError('Event date is required.', 400);
    }

    if (!isValidDate(event_date)) {
      throw createHttpError('Event date is invalid.', 400);
    }

    if (guest_count !== undefined && guest_count !== null && guest_count !== '') {
      if (!isPositiveInteger(guest_count)) {
        throw createHttpError('Guest count must be a positive whole number.', 400);
      }
    }

    if (start_time && end_time && String(start_time) >= String(end_time)) {
      throw createHttpError('End time must be later than start time.', 400);
    }

    if (package_id !== undefined && package_id !== null && package_id !== '') {
      const numericPackageId = Number(package_id);

      if (!Number.isInteger(numericPackageId) || numericPackageId <= 0) {
        throw createHttpError('Package id must be a valid positive number.', 400);
      }
    }

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

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
        String(full_name).trim(),
        normalizedEmail,
        'public-booking-no-password',
        String(phone).trim(),
      ];

      const clientResult = await client.query(clientQuery, clientValues);
      const customerId = clientResult.rows[0].id;

      const bookingCode = generateBookingCode();

      let subtotal = 0;
      let validPackageId = null;

      if (package_id !== undefined && package_id !== null && package_id !== '') {
        const packageResult = await client.query(
          `
            SELECT id, base_price
            FROM packages
            WHERE id = $1
            LIMIT 1
          `,
          [Number(package_id)]
        );

        if (!packageResult.rows[0]) {
          throw createHttpError('Selected package does not exist.', 400);
        }

        validPackageId = packageResult.rows[0].id;
        subtotal = Number(packageResult.rows[0].base_price || 0);
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
        String(event_title).trim(),
        event_type ? String(event_type).trim() : null,
        event_date,
        start_time || null,
        end_time || null,
        venue_name ? String(venue_name).trim() : null,
        venue_address ? String(venue_address).trim() : null,
        guest_count ? Number(guest_count) : 0,
        special_requests ? String(special_requests).trim() : null,
        subtotal,
        totalPrice,
        depositAmount,
        remainingBalance,
      ];

      const bookingResult = await client.query(bookingQuery, bookingValues);

      await client.query('COMMIT');

      return bookingResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new BookingService();