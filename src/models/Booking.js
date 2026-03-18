class Booking {
  constructor({
    id = null,
    bookingCode,
    customerId,
    packageId = null,
    eventTitle,
    eventType = null,
    eventDate,
    startTime = null,
    endTime = null,
    venueName = null,
    venueAddress = null,
    guestCount = 0,
    specialRequests = '',
    status = 'Pending',
    paymentStatus = 'Unpaid',
    subtotal = 0,
    discountAmount = 0,
    totalPrice = 0,
    depositAmount = 0,
    remainingBalance = 0,
    selectedMascots = [],
    selectedActivities = [],
    selectedExtras = [],
    reservedInventory = [],
    assignedStaff = [],
    createdBy = null,
    createdAt = null,
    updatedAt = null
  }) {
    this.id = id;
    this.bookingCode = bookingCode;
    this.customerId = customerId;
    this.packageId = packageId;
    this.eventTitle = eventTitle;
    this.eventType = eventType;
    this.eventDate = eventDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.venueName = venueName;
    this.venueAddress = venueAddress;
    this.guestCount = guestCount;
    this.specialRequests = specialRequests;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.subtotal = subtotal;
    this.discountAmount = discountAmount;
    this.totalPrice = totalPrice;
    this.depositAmount = depositAmount;
    this.remainingBalance = remainingBalance;
    this.selectedMascots = selectedMascots;
    this.selectedActivities = selectedActivities;
    this.selectedExtras = selectedExtras;
    this.reservedInventory = reservedInventory;
    this.assignedStaff = assignedStaff;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Booking;
