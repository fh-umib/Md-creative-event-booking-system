const bookingService = require('../../services/bookingService');
const bookingAdminService = require('../../services/bookingAdminService');
const pool = require('../../data/config/db');

class BookingController {
  async getAll(req, res, next) {
    try {
      const { rows } = await pool.query(`
        SELECT
          b.*,
          u.full_name AS customer_name,
          u.email AS customer_email,
          p.title AS package_title
        FROM bookings b
        JOIN users u ON b.customer_id = u.id
        LEFT JOIN packages p ON b.package_id = p.id
        ORDER BY b.created_at DESC
      `);

      res.status(200).json(rows);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const booking = await bookingAdminService.getBookingById(Number(req.params.id));

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found.' });
      }

      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await bookingService.createBooking(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: 'Status is required.' });
      }

      const updated = await bookingAdminService.updateBookingStatus(
        Number(req.params.id),
        status
      );

      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async updatePaymentStatus(req, res, next) {
    try {
      const { payment_status } = req.body;

      if (!payment_status) {
        return res.status(400).json({ message: 'Payment status is required.' });
      }

      const allowed = ['Unpaid', 'Partially Paid', 'Paid', 'Refunded'];

      if (!allowed.includes(payment_status)) {
        return res.status(400).json({ message: 'Invalid payment status.' });
      }

      const query = `
        UPDATE bookings
        SET
          payment_status = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
      `;

      const { rows } = await pool.query(query, [
        payment_status,
        Number(req.params.id),
      ]);

      if (!rows[0]) {
        return res.status(404).json({ message: 'Booking not found.' });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await bookingAdminService.deleteBooking(Number(req.params.id));
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingController();