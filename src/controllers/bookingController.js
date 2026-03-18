const bookingService = require('../services/bookingService');

class BookingController {
  async getAll(req, res, next) {
    try {
      const bookings = await bookingService.getAllBookings();
      res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const booking = await bookingService.createBooking(req.body, req.user?.id || null);
      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const booking = await bookingService.updateBookingStatus(
        req.params.id,
        req.body.status
      );
      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingController();
