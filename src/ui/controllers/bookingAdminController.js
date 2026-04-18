const bookingAdminService = require('../../services/bookingAdminService');

function createBadRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function parseBookingId(idParam) {
  const bookingId = Number(idParam);

  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    throw createBadRequest('A valid booking id is required.');
  }

  return bookingId;
}

class BookingAdminController {
  async getAll(req, res, next) {
    try {
      const { search = '', status = '' } = req.query;

      const bookings = await bookingAdminService.getAllBookings({
        search,
        status,
      });

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
      const bookingId = parseBookingId(req.params.id);
      const booking = await bookingAdminService.getBookingById(bookingId);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Booking fetched successfully.',
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const bookingId = parseBookingId(req.params.id);
      const { status } = req.body;

      if (!status || !String(status).trim()) {
        return res.status(400).json({
          success: false,
          message: 'Status is required.',
        });
      }

      const updated = await bookingAdminService.updateBookingStatus(
        bookingId,
        String(status).trim()
      );

      return res.status(200).json({
        success: true,
        message: 'Booking status updated successfully.',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const bookingId = parseBookingId(req.params.id);
      const deleted = await bookingAdminService.deleteBooking(bookingId);

      return res.status(200).json({
        success: true,
        message: 'Booking deleted successfully.',
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingAdminController();