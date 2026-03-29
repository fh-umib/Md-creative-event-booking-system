const path = require('path');
const FileRepository = require('./FileRepository');
const Review = require('../../models/Review');

class FileReviewRepository extends FileRepository {
  constructor(filePath) {
    super(filePath);
  }

  getAll() {
    return super.getAll().map((item) => this.mapToReview(item));
  }

  getById(id) {
    const item = super.getById(id);
    return item ? this.mapToReview(item) : null;
  }

  add(data) {
    const items = super.getAll();

    const newItem = {
      id:
        items.length > 0
          ? Math.max(...items.map((item) => Number(item.id) || 0)) + 1
          : 1,
      customerName: data.customerName,
      comment: data.comment || '',
      rating: Number(data.rating),
      isApproved: data.isApproved !== undefined ? String(data.isApproved) : 'true',
    };

    items.push(newItem);
    this.save(items);

    return this.mapToReview(newItem);
  }

  update(id, updatedData) {
    const items = super.getAll();
    const index = items.findIndex((item) => String(item.id) === String(id));

    if (index === -1) {
      return null;
    }

    items[index] = {
      ...items[index],
      ...updatedData,
      id: items[index].id,
    };

    this.save(items);
    return this.mapToReview(items[index]);
  }

  delete(id) {
    const items = super.getAll();
    const index = items.findIndex((item) => String(item.id) === String(id));

    if (index === -1) {
      return false;
    }

    items.splice(index, 1);
    this.save(items);
    return true;
  }

  mapToReview(item) {
    return new Review({
      id: Number(item.id),
      customerName: item.customerName,
      comment: item.comment,
      rating: Number(item.rating),
      isApproved: String(item.isApproved).toLowerCase() === 'true',
    });
  }
}

module.exports = new FileReviewRepository(
  path.join(__dirname, '../storage/reviews.csv')
);