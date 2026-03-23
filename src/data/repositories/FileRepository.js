const fs = require('fs');
const path = require('path');
const IRepository = require('./IRepository');

class FileRepository extends IRepository {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.items = this.loadFromFile();
  }

  loadFromFile() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }

      const data = fs.readFileSync(this.filePath, 'utf8').trim();

      if (!data) {
        return [];
      }

      const lines = data.split('\n');
      const headers = lines[0].split(',');

      return lines.slice(1).map((line) => {
        const values = line.split(',');
        const item = {};

        headers.forEach((header, index) => {
          item[header.trim()] = values[index] ? values[index].trim() : '';
        });

        return item;
      });
    } catch (error) {
      console.error('Error reading CSV file:', error.message);
      return [];
    }
  }

  getAll() {
    return this.items;
  }

  getById(id) {
    return this.items.find((item) => String(item.id) === String(id)) || null;
  }

  add(entity) {
    this.items.push(entity);
    this.save();
    return entity;
  }

  save() {
    try {
      const dir = path.dirname(this.filePath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (this.items.length === 0) {
        fs.writeFileSync(this.filePath, '');
        return;
      }

      const headers = Object.keys(this.items[0]);
      const rows = this.items.map((item) =>
        headers.map((header) => item[header] ?? '').join(',')
      );

      const csvContent = [headers.join(','), ...rows].join('\n');
      fs.writeFileSync(this.filePath, csvContent, 'utf8');
    } catch (error) {
      console.error('Error saving CSV file:', error.message);
    }
  }
}

module.exports = FileRepository;