const bookingAdminService = require('../../services/bookingAdminService');

class BookingAdminController {
  async getAll(req, res, next) {
    try {
      const { search = '', status = '' } = req.query;
      const bookings = await bookingAdminService.getAllBookings({ search, status });
      res.status(200).json(bookings);
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

  async delete(req, res, next) {
    try {
      const deleted = await bookingAdminService.deleteBooking(Number(req.params.id));
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingAdminController();