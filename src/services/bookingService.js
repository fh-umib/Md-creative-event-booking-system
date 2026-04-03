const bookingRepository = require('../data/repositories/bookingRepository');
const bookingItemRepository = require('../data/repositories/bookingItemRepository');
const packageRepository = require('../data/repositories/packageRepository');
const { BOOKING_CATEGORY_VALUES } = require('../models/BookingCategory');
class BookingService {
  validateCategory(category) {
    if (!category) return;

    if (!BOOKING_CATEGORY_VALUES.includes(category)) {
      throw new Error(
        `Invalid booking category. Allowed values: ${BOOKING_CATEGORY_VALUES.join(', ')}`
      );
    }
  }

  validateDetails(data) {
    if (!data.customerId) {
      throw new Error('Customer ID is required.');
    }

    if (!data.eventTitle || String(data.eventTitle).trim() === '') {
      throw new Error('Event title is required.');
    }

    if (!data.eventDate) {
      throw new Error('Event date is required.');
    }

    if (!data.venueName || String(data.venueName).trim() === '') {
      throw new Error('Venue name is required.');
    }
  }

  async validatePackage(packageId, category = null) {
    if (!packageId) {
      throw new Error('Package ID is required.');
    }

    const packageItem = await packageRepository.getById(packageId);

    if (!packageItem) {
      throw new Error('Selected package was not found.');
    }

    if (!packageItem.is_active) {
      throw new Error('Selected package is not active.');
    }

    if (category && packageItem.category !== category) {
      throw new Error('Selected package does not belong to the chosen category.');
    }

    return packageItem;
  }

  calculateItemsTotal(items = []) {
    return items.reduce((sum, item) => {
      const quantity = Number(item.quantity || 1);
      const unitPrice = Number(item.unitPrice || 0);
      return sum + quantity * unitPrice;
    }, 0);
  }

  calculateBookingTotals({ packageBasePrice = 0, mascots = [], activities = [], extras = [], discountAmount = 0, depositAmount = 0 }) {
    const mascotsTotal = this.calculateItemsTotal(mascots);
    const activitiesTotal = this.calculateItemsTotal(activities);
    const extrasTotal = this.calculateItemsTotal(extras);

    const subtotal =
      Number(packageBasePrice) + mascotsTotal + activitiesTotal + extrasTotal;

    const totalPrice = Math.max(subtotal - Number(discountAmount || 0), 0);
    const remainingBalance = Math.max(totalPrice - Number(depositAmount || 0), 0);

    return {
      subtotal,
      totalPrice,
      remainingBalance,
    };
  }

  generateBookingCode() {
    const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
    const timestampPart = Date.now().toString().slice(-5);
    return `MD-${timestampPart}-${randomPart}`;
  }

  async getAll(filters = {}) {
    if (filters.category) {
      this.validateCategory(filters.category);
    }

    return bookingRepository.getAll(filters);
  }

  async getById(id) {
    const booking = await bookingRepository.getById(id);

    if (!booking) {
      throw new Error('Booking not found.');
    }

    const items = await bookingItemRepository.getByBookingId(id);

    return {
      ...booking,
      items,
    };
  }

  async create(data) {
    this.validateCategory(data.category);
    this.validateDetails(data);

    const packageItem = await this.validatePackage(data.packageId, data.category);

    const mascots = Array.isArray(data.mascots) ? data.mascots : [];
    const activities = Array.isArray(data.activities) ? data.activities : [];
    const extras = Array.isArray(data.extras) ? data.extras : [];

    const discountAmount = Number(data.discountAmount || 0);
    const depositAmount = Number(data.depositAmount || 0);

    const totals = this.calculateBookingTotals({
      packageBasePrice: Number(packageItem.base_price || 0),
      mascots,
      activities,
      extras,
      discountAmount,
      depositAmount,
    });

    const bookingPayload = {
      bookingCode: this.generateBookingCode(),
      customerId: Number(data.customerId),
      packageId: Number(data.packageId),
      eventTitle: String(data.eventTitle).trim(),
      eventType: data.eventType?.trim() || data.category || null,
      eventDate: data.eventDate,
      startTime: data.startTime || null,
      endTime: data.endTime || null,
      venueName: String(data.venueName).trim(),
      venueAddress: data.venueAddress?.trim() || null,
      guestCount: Number(data.guestCount || 0),
      specialRequests: data.specialRequests?.trim() || null,
      status: data.status || 'Pending',
      paymentStatus: data.paymentStatus || 'Unpaid',
      subtotal: totals.subtotal,
      discountAmount,
      totalPrice: totals.totalPrice,
      depositAmount,
      remainingBalance: totals.remainingBalance,
      createdBy: data.createdBy ? Number(data.createdBy) : null,
    };

    const createdBooking = await bookingRepository.create(bookingPayload);

    await bookingItemRepository.replaceItems(createdBooking.id, 'mascots', mascots);
    await bookingItemRepository.replaceItems(createdBooking.id, 'activities', activities);
    await bookingItemRepository.replaceItems(createdBooking.id, 'extras', extras);

    return this.getById(createdBooking.id);
  }

  async updateStatus(id, status) {
    const allowedStatuses = ['Pending', 'Approved', 'Completed', 'Cancelled'];

    if (!allowedStatuses.includes(status)) {
      throw new Error(`Invalid booking status. Allowed values: ${allowedStatuses.join(', ')}`);
    }

    const updated = await bookingRepository.updateStatus(id, status);

    if (!updated) {
      throw new Error('Booking not found.');
    }

    return updated;
  }

  async updatePaymentStatus(id, paymentStatus) {
    const allowedStatuses = ['Unpaid', 'Partially Paid', 'Paid', 'Refunded'];

    if (!allowedStatuses.includes(paymentStatus)) {
      throw new Error(
        `Invalid payment status. Allowed values: ${allowedStatuses.join(', ')}`
      );
    }

    const updated = await bookingRepository.updatePaymentStatus(id, paymentStatus);

    if (!updated) {
      throw new Error('Booking not found.');
    }

    return updated;
  }

  async delete(id) {
    const deleted = await bookingRepository.delete(id);

    if (!deleted) {
      throw new Error('Booking not found or could not be deleted.');
    }

    return { success: true };
  }
}

module.exports = new BookingService();