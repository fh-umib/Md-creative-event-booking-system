class Review {
  constructor({
    id,
    customerName,
    comment,
    rating,
    isApproved = true,
  }) {
    this.id = Number(id);
    this.customerName = customerName;
    this.comment = comment || '';
    this.rating = Number(rating);
    this.isApproved = Boolean(isApproved);
  }
}

module.exports = Review;