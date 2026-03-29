const fileReviewRepository = require('../data/repositories/FileReviewRepository');

class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  listReviews(filters = {}) {
    let reviews = this.reviewRepository.getAll();

    if (filters.customerName) {
      reviews = reviews.filter((item) =>
        item.customerName
          .toLowerCase()
          .includes(filters.customerName.toLowerCase())
      );
    }

    if (filters.minRating) {
      reviews = reviews.filter(
        (item) => Number(item.rating) >= Number(filters.minRating)
      );
    }

    if (filters.onlyApproved === 'true') {
      reviews = reviews.filter((item) => item.isApproved === true);
    }

    return reviews;
  }

  getReviewById(id) {
    const item = this.reviewRepository.getById(id);

    if (!item) {
      throw new Error('Review not found');
    }

    return item;
  }

  createReview(data) {
    if (!data.customerName || !data.customerName.trim()) {
      throw new Error('Customer name is required');
    }

    if (!data.comment || !data.comment.trim()) {
      throw new Error('Comment is required');
    }

    if (data.rating === undefined || Number(data.rating) < 1 || Number(data.rating) > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    return this.reviewRepository.add({
      customerName: data.customerName.trim(),
      comment: data.comment.trim(),
      rating: Number(data.rating),
      isApproved: data.isApproved !== undefined ? data.isApproved : true,
    });
  }

  updateReview(id, data) {
    if (!data.customerName || !data.customerName.trim()) {
      throw new Error('Customer name is required');
    }

    if (!data.comment || !data.comment.trim()) {
      throw new Error('Comment is required');
    }

    if (data.rating === undefined || Number(data.rating) < 1 || Number(data.rating) > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const updated = this.reviewRepository.update(id, {
      customerName: data.customerName.trim(),
      comment: data.comment.trim(),
      rating: Number(data.rating),
      isApproved: data.isApproved !== undefined ? String(data.isApproved) : 'true',
    });

    if (!updated) {
      throw new Error('Review not found');
    }

    return updated;
  }

  deleteReview(id) {
    const deleted = this.reviewRepository.delete(id);

    if (!deleted) {
      throw new Error('Review not found');
    }

    return { message: 'Review deleted successfully' };
  }
}

module.exports = new ReviewService(fileReviewRepository);
module.exports.ReviewService = ReviewService;