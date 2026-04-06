const packageRepository = require('../data/repositories/PgPackageRepository');

class PackageService {
  async getAllAdmin(search = '') {
    return packageRepository.getAllAdmin(search);
  }

  async getPublicCategories() {
    return packageRepository.getPublicCategories();
  }

  async getByCategory(category) {
    return packageRepository.getByCategory(category);
  }

  async getById(id) {
    return packageRepository.getById(Number(id));
  }

  async create(payload) {
    if (!payload.title?.trim()) {
      throw new Error('Package title is required.');
    }

    return packageRepository.create({
      title: payload.title.trim(),
      description: payload.description?.trim() || '',
      category: payload.category?.trim() || '',
      duration_minutes: Number(payload.duration_minutes || 60),
      min_mascots: Number(payload.min_mascots || 0),
      max_mascots: Number(payload.max_mascots || 0),
      base_price: Number(payload.base_price || 0),
      is_active: payload.is_active !== false,
    });
  }

  async update(id, payload) {
    const existing = await packageRepository.getById(Number(id));

    if (!existing) {
      throw new Error('Package not found.');
    }

    return packageRepository.update(Number(id), {
      title: payload.title?.trim() || existing.title,
      description:
        payload.description !== undefined
          ? payload.description.trim()
          : existing.description,
      category: payload.category?.trim() || existing.category,
      duration_minutes:
        payload.duration_minutes !== undefined
          ? Number(payload.duration_minutes)
          : Number(existing.duration_minutes),
      min_mascots:
        payload.min_mascots !== undefined
          ? Number(payload.min_mascots)
          : Number(existing.min_mascots),
      max_mascots:
        payload.max_mascots !== undefined
          ? Number(payload.max_mascots)
          : Number(existing.max_mascots),
      base_price:
        payload.base_price !== undefined
          ? Number(payload.base_price)
          : Number(existing.base_price),
      is_active:
        payload.is_active !== undefined
          ? Boolean(payload.is_active)
          : existing.is_active,
    });
  }

  async delete(id) {
    const deleted = await packageRepository.delete(Number(id));
    if (!deleted) {
      throw new Error('Package not found.');
    }
    return deleted;
  }
}

module.exports = new PackageService();