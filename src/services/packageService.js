const filePackageRepository = require('../data/repositories/FilePackageRepository');

class PackageService {
  constructor(packageRepository) {
    this.packageRepository = packageRepository;
  }

  listPackages(filters = {}) {
    let packages = this.packageRepository.getAll();

    if (filters.name) {
      packages = packages.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.maxPrice) {
      packages = packages.filter(
        (item) => Number(item.price) <= Number(filters.maxPrice)
      );
    }

    return packages;
  }

  getPackageById(id) {
    const item = this.packageRepository.getById(id);

    if (!item) {
      throw new Error('Package not found');
    }

    return item;
  }

  createPackage(data) {
    if (!data.name || !data.name.trim()) {
      throw new Error('Package name is required');
    }

    if (data.price === undefined || Number(data.price) <= 0) {
      throw new Error('Package price must be greater than 0');
    }

    return this.packageRepository.add({
      name: data.name.trim(),
      description: data.description || '',
      price: Number(data.price),
      imageUrl: data.imageUrl || '',
      isActive: data.isActive !== undefined ? data.isActive : true,
    });
  }

  updatePackage(id, data) {
    if (!data.name || !data.name.trim()) {
      throw new Error('Package name is required');
    }

    if (data.price === undefined || Number(data.price) <= 0) {
      throw new Error('Package price must be greater than 0');
    }

    const updated = this.packageRepository.update(id, {
      name: data.name.trim(),
      description: data.description || '',
      price: Number(data.price),
      imageUrl: data.imageUrl || '',
      isActive: data.isActive !== undefined ? String(data.isActive) : 'true',
    });

    if (!updated) {
      throw new Error('Package not found');
    }

    return updated;
  }

  deletePackage(id) {
    const deleted = this.packageRepository.delete(id);

    if (!deleted) {
      throw new Error('Package not found');
    }

    return { message: 'Package deleted successfully' };
  }
}

module.exports = new PackageService(filePackageRepository);
module.exports.PackageService = PackageService;