const bookingService = require('../../services/bookingService');

class BookingController {
  async create(req, res, next) {
    try {
      const created = await bookingService.createBooking(req.body);

      return res.status(201).json({
        success: true,
        message: 'Booking created successfully.',
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingController();