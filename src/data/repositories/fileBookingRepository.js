const path = require('path');
const FileRepository = require('./FileRepository');

const filePath = path.join(__dirname, '../storage/bookings.csv');

class FileBookingRepository extends FileRepository {
  constructor() {
    super(filePath);
  }
}

module.exports = new FileBookingRepository();