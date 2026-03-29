const pool = require('../data/db/db');
const bookingRepository = require('../data/repositories/FileBookingRepository');
const packageRepository = require('../data/repositories/FilePackageRepository');

class BookingService {
  generateBookingCode() {
    const timestamp = Date.now().toString().slice(-6);
    return `MD-${timestamp}`;
  }

  async getAll() {
    return await bookingRepository.getAll();
  }

  async getAllBookings() {
    return await bookingRepository.getAll();
  }

  async create(data, currentUserId = null) {
    return await this.createBooking(data, currentUserId);
  }

  async createBooking(data, currentUserId = null) {
    if (!data.customerId) throw new Error('Customer is required');
    if (!data.eventTitle) throw new Error('Event title is required');
    if (!data.eventDate) throw new Error('Event date is required');

    let packageRecord = null;
    if (data.packageId) {
      packageRecord = await packageRepository.getById(data.packageId);
      if (!packageRecord) throw new Error('Package not found');
    }

    const subtotal = Number(data.subtotal || packageRecord?.base_price || 0);
    const discountAmount = Number(data.discountAmount || 0);
    const totalPrice = subtotal - discountAmount;
    const depositAmount = Number(data.depositAmount || 0);
    const remainingBalance = totalPrice - depositAmount;

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const booking = await bookingRepository.create(
        {
          bookingCode: this.generateBookingCode(),
          customerId: data.customerId,
          packageId: data.packageId || null,
          eventTitle: data.eventTitle,
          eventType: data.eventType || null,
          eventDate: data.eventDate,
          startTime: data.startTime || null,
          endTime: data.endTime || null,
          venueName: data.venueName || null,
          venueAddress: data.venueAddress || null,
          guestCount: Number(data.guestCount || 0),
          specialRequests: data.specialRequests || '',
          status: 'Pending',
          paymentStatus: data.paymentStatus || 'Unpaid',
          subtotal,
          discountAmount,
          totalPrice,
          depositAmount,
          remainingBalance,
          createdBy: currentUserId,
        },
        client
      );

      for (const item of data.selectedMascots || []) {
        await bookingRepository.addBookingMascot(
          booking.id,
          item.mascotId,
          Number(item.quantity || 1),
          Number(item.unitPrice || 0),
          Number(item.totalPrice || 0),
          client
        );
      }

      for (const item of data.selectedActivities || []) {
        await bookingRepository.addBookingActivity(
          booking.id,
          item.activityId,
          Number(item.quantity || 1),
          Number(item.unitPrice || 0),
          Number(item.totalPrice || 0),
          client
        );
      }

      for (const item of data.selectedExtras || []) {
        await bookingRepository.addBookingExtra(
          booking.id,
          item.extraId,
          Number(item.quantity || 1),
          Number(item.unitPrice || 0),
          Number(item.totalPrice || 0),
          client
        );
      }

      await client.query('COMMIT');
      return booking;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async updateStatus(id, status) {
    return await this.updateBookingStatus(id, status);
  }

  async updateBookingStatus(id, status) {
    const allowedStatuses = ['Pending', 'Approved', 'Completed', 'Cancelled'];

    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid booking status');
    }

    const booking = await bookingRepository.updateStatus(id, status);

    if (!booking) {
      throw new Error('Booking not found');
    }

    return booking;
  }
}

module.exports = new BookingService();