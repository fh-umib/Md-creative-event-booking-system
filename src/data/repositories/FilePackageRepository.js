const path = require('path');
const FileRepository = require('./FileRepository');
const Package = require('../../models/Package');

class FilePackageRepository extends FileRepository {
  constructor(filePath) {
    super(filePath);
  }

  getAll() {
    return super.getAll().map((item) => this.mapToPackage(item));
  }

  getById(id) {
    const item = super.getById(id);
    return item ? this.mapToPackage(item) : null;
  }

  add(data) {
    const items = super.getAll();

    const newItem = {
      id:
        items.length > 0
          ? Math.max(...items.map((item) => Number(item.id) || 0)) + 1
          : 1,
      name: data.name,
      description: data.description || '',
      price: Number(data.price),
      imageUrl: data.imageUrl || '',
      isActive: data.isActive !== undefined ? String(data.isActive) : 'true',
    };

    items.push(newItem);
    this.save(items);

    return this.mapToPackage(newItem);
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
    return this.mapToPackage(items[index]);
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

  mapToPackage(item) {
    return new Package({
      id: Number(item.id),
      name: item.name,
      description: item.description,
      price: Number(item.price),
      imageUrl: item.imageUrl || '',
      isActive: String(item.isActive).toLowerCase() === 'true',
    });
  }
}

module.exports = new FilePackageRepository(
  path.join(__dirname, '../storage/packages.csv')
);