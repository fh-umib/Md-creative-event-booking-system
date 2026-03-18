const pool = require('../config/db');
const bookingRepository = require('../repositories/bookingRepository');
const packageRepository = require('../repositories/packageRepository');
const userRepository = require('../repositories/userRepository');
const inventoryRepository = require('../repositories/inventoryRepository');

class BookingService {
  generateBookingCode() {
    const timestamp = Date.now().toString().slice(-6);
    return `MD-${timestamp}`;
  }

  async getAllBookings() {
    return await bookingRepository.getAll();
  }

  async createBooking(data, currentUserId = null) {
    if (!data.customerId) throw new Error('Customer is required');
    if (!data.eventTitle) throw new Error('Event title is required');
    if (!data.eventDate) throw new Error('Event date is required');

    const customer = await userRepository.findById(data.customerId);
    if (!customer) throw new Error('Customer not found');

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

      const booking = await bookingRepository.create({
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
        createdBy: currentUserId
      }, client);

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

      for (const item of data.reservedInventory || []) {
        const inventory = await inventoryRepository.getById(item.inventoryItemId, client);
        if (!inventory) throw new Error(`Inventory item ${item.inventoryItemId} not found`);
        if (inventory.available_quantity < Number(item.reservedQuantity)) {
          throw new Error(`Not enough quantity for inventory item ${inventory.name}`);
        }

        await inventoryRepository.reduceAvailableQuantity(
          item.inventoryItemId,
          Number(item.reservedQuantity),
          client
        );

        await bookingRepository.reserveInventoryItem(
          booking.id,
          item.inventoryItemId,
          Number(item.reservedQuantity),
          item.notes || '',
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
