const bookingService = require('../../services/bookingService');

class BookingController {
  async getAll(req, res, next) {
    try {
      const filters = {
        status: req.query.status || undefined,
        paymentStatus: req.query.paymentStatus || undefined,
        customerId: req.query.customerId ? Number(req.query.customerId) : undefined,
        packageId: req.query.packageId ? Number(req.query.packageId) : undefined,
        eventDate: req.query.eventDate || undefined,
        category: req.query.category || undefined,
        search: req.query.search || undefined,
      };

      const bookings = await bookingService.getAll(filters);

      return res.status(200).json({
        success: true,
        message: 'Bookings fetched successfully.',
        data: bookings,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const bookingId = Number(req.params.id);
      const booking = await bookingService.getById(bookingId);

      return res.status(200).json({
        success: true,
        message: 'Booking fetched successfully.',
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const createdBooking = await bookingService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Booking created successfully.',
        data: createdBooking,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const bookingId = Number(req.params.id);
      const { status } = req.body;

      const updatedBooking = await bookingService.updateStatus(bookingId, status);

      return res.status(200).json({
        success: true,
        message: 'Booking status updated successfully.',
        data: updatedBooking,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePaymentStatus(req, res, next) {
    try {
      const bookingId = Number(req.params.id);
      const { paymentStatus } = req.body;

      const updatedBooking = await bookingService.updatePaymentStatus(
        bookingId,
        paymentStatus
      );

      return res.status(200).json({
        success: true,
        message: 'Booking payment status updated successfully.',
        data: updatedBooking,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const bookingId = Number(req.params.id);
      const result = await bookingService.delete(bookingId);

      return res.status(200).json({
        success: true,
        message: 'Booking deleted successfully.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingController();