const packageRepository = require('../data/repositories/packageRepository');
const { BOOKING_CATEGORY_VALUES } = require('../models/BookingCategory');

class PackageService {
  validateCategory(category) {
    if (!category) return;

    if (!BOOKING_CATEGORY_VALUES.includes(category)) {
      throw new Error(
        `Invalid package category. Allowed values: ${BOOKING_CATEGORY_VALUES.join(', ')}`
      );
    }
  }

  validatePackagePayload(data, { isUpdate = false } = {}) {
    if (!isUpdate || data.title !== undefined) {
      if (!data.title || String(data.title).trim() === '') {
        throw new Error('Package title is required.');
      }
    }

    if (data.category !== undefined) {
      this.validateCategory(data.category);
    }

    if (data.durationMinutes !== undefined && Number(data.durationMinutes) <= 0) {
      throw new Error('Package duration must be greater than 0.');
    }

    if (data.basePrice !== undefined && Number(data.basePrice) < 0) {
      throw new Error('Package base price cannot be negative.');
    }

    if (
      data.minMascots !== undefined &&
      data.maxMascots !== undefined &&
      Number(data.minMascots) > Number(data.maxMascots)
    ) {
      throw new Error('Minimum mascots cannot be greater than maximum mascots.');
    }
  }

  mapPackageInput(data) {
    return {
      title: String(data.title).trim(),
      description: data.description?.trim() || null,
      category: data.category || null,
      durationMinutes:
        data.durationMinutes !== undefined ? Number(data.durationMinutes) : 60,
      minMascots: data.minMascots !== undefined ? Number(data.minMascots) : 0,
      maxMascots: data.maxMascots !== undefined ? Number(data.maxMascots) : 5,
      basePrice: data.basePrice !== undefined ? Number(data.basePrice) : 0,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    };
  }

  async getAll(filters = {}) {
    if (filters.category) {
      this.validateCategory(filters.category);
    }

    return packageRepository.getAll(filters);
  }

  async getById(id) {
    const packageItem = await packageRepository.getById(id);

    if (!packageItem) {
      throw new Error('Package not found.');
    }

    return packageItem;
  }

  async create(data) {
    this.validatePackagePayload(data);

    const payload = this.mapPackageInput(data);
    return packageRepository.create(payload);
  }

  async update(id, data) {
    const existing = await packageRepository.getById(id);

    if (!existing) {
      throw new Error('Package not found.');
    }

    const merged = {
      title: data.title ?? existing.title,
      description: data.description ?? existing.description,
      category: data.category ?? existing.category,
      durationMinutes: data.durationMinutes ?? existing.duration_minutes,
      minMascots: data.minMascots ?? existing.min_mascots,
      maxMascots: data.maxMascots ?? existing.max_mascots,
      basePrice: data.basePrice ?? existing.base_price,
      isActive: data.isActive ?? existing.is_active,
    };

    this.validatePackagePayload(merged, { isUpdate: true });

    const payload = this.mapPackageInput(merged);
    return packageRepository.update(id, payload);
  }

  async delete(id) {
    const deleted = await packageRepository.softDelete(id);

    if (!deleted) {
      throw new Error('Package not found or could not be deleted.');
    }

    return { success: true };
  }
}

module.exports = new PackageService();