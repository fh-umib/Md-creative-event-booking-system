class StaffAssignment {
  constructor({
    id = null,
    bookingId,
    staffUserId,
    assignmentRole,
    startTime = null,
    endTime = null,
    notes = '',
    createdAt = null
  }) {
    this.id = id;
    this.bookingId = bookingId;
    this.staffUserId = staffUserId;
    this.assignmentRole = assignmentRole;
    this.startTime = startTime;
    this.endTime = endTime;
    this.notes = notes;
    this.createdAt = createdAt;
  }
}

module.exports = StaffAssignment;
