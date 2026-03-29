const bookingService = require('../../services/bookingService');

class BookingController {
  async getAll(req, res) {
    try {
      const bookings = await bookingService.getAll();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const booking = await bookingService.create(req.body);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const booking = await bookingService.updateStatus(
        req.params.id,
        req.body.status
      );
      res.status(200).json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new BookingController();