class BookingItem {
  constructor({
    id = null,
    bookingId,
    itemType,
    itemId,
    quantity = 1,
    unitPrice = 0,
    totalPrice = 0,
    notes = null,
  }) {
    this.id = id;
    this.bookingId = bookingId;
    this.itemType = itemType;
    this.itemId = itemId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.totalPrice = totalPrice;
    this.notes = notes;
  }
}

module.exports = BookingItem;