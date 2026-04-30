const packageRepository = require('../data/repositories/PgPackageRepository');

function createHttpError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeString(value) {
  return value !== undefined && value !== null ? String(value).trim() : '';
}

function toNumber(value) {
  return Number(value);
}

function isNonNegativeInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) >= 0;
}

function isNonNegativeNumber(value) {
  return !Number.isNaN(Number(value)) && Number(value) >= 0;
}

class PackageService {
  async getAllAdmin(search = '') {
    return packageRepository.getAllAdmin(normalizeString(search));
  }

  async getAllPublic() {
    return packageRepository.getAllPublic();
  }

  async getAllPublicPackages() {
    return packageRepository.getAllPublic();
  }

  async getPublicCategories() {
    return packageRepository.getPublicCategories();
  }

  async getByCategory(category) {
    const normalizedCategory = normalizeString(category);

    if (!normalizedCategory) {
      throw createHttpError('Category is required.', 400);
    }

    return packageRepository.getByCategory(normalizedCategory);
  }

  async getById(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid package id is required.', 400);
    }

    return packageRepository.getById(Number(id));
  }

  async create(payload) {
    const title = normalizeString(payload.title);
    const description = payload.description !== undefined ? normalizeString(payload.description) : '';
    const category = normalizeString(payload.category);

    const durationMinutes =
      payload.duration_minutes !== undefined ? toNumber(payload.duration_minutes) : 60;

    const minMascots =
      payload.min_mascots !== undefined ? toNumber(payload.min_mascots) : 0;

    const maxMascots =
      payload.max_mascots !== undefined ? toNumber(payload.max_mascots) : 0;

    const basePrice =
      payload.base_price !== undefined ? toNumber(payload.base_price) : 0;

    if (!title) {
      throw createHttpError('Package title is required.', 400);
    }

    if (!category) {
      throw createHttpError('Package category is required.', 400);
    }

    if (!isNonNegativeInteger(durationMinutes) || durationMinutes <= 0) {
      throw createHttpError('Duration minutes must be a positive whole number.', 400);
    }

    if (!isNonNegativeInteger(minMascots)) {
      throw createHttpError('Minimum mascots must be a non-negative whole number.', 400);
    }

    if (!isNonNegativeInteger(maxMascots)) {
      throw createHttpError('Maximum mascots must be a non-negative whole number.', 400);
    }

    if (minMascots > maxMascots) {
      throw createHttpError('Minimum mascots cannot be greater than maximum mascots.', 400);
    }

    if (!isNonNegativeNumber(basePrice)) {
      throw createHttpError('Base price must be a non-negative number.', 400);
    }

    return packageRepository.create({
      title,
      description,
      category,
      duration_minutes: durationMinutes,
      min_mascots: minMascots,
      max_mascots: maxMascots,
      base_price: basePrice,
      is_active: payload.is_active !== false,
    });
  }

  async update(id, payload) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid package id is required.', 400);
    }

    const existing = await packageRepository.getById(Number(id));

    if (!existing) {
      throw createHttpError('Package not found.', 404);
    }

    const title =
      payload.title !== undefined ? normalizeString(payload.title) : existing.title;

    const description =
      payload.description !== undefined
        ? normalizeString(payload.description)
        : existing.description;

    const category =
      payload.category !== undefined
        ? normalizeString(payload.category)
        : existing.category;

    const durationMinutes =
      payload.duration_minutes !== undefined
        ? toNumber(payload.duration_minutes)
        : Number(existing.duration_minutes);

    const minMascots =
      payload.min_mascots !== undefined
        ? toNumber(payload.min_mascots)
        : Number(existing.min_mascots);

    const maxMascots =
      payload.max_mascots !== undefined
        ? toNumber(payload.max_mascots)
        : Number(existing.max_mascots);

    const basePrice =
      payload.base_price !== undefined
        ? toNumber(payload.base_price)
        : Number(existing.base_price);

    if (!title) {
      throw createHttpError('Package title is required.', 400);
    }

    if (!category) {
      throw createHttpError('Package category is required.', 400);
    }

    if (!isNonNegativeInteger(durationMinutes) || durationMinutes <= 0) {
      throw createHttpError('Duration minutes must be a positive whole number.', 400);
    }

    if (!isNonNegativeInteger(minMascots)) {
      throw createHttpError('Minimum mascots must be a non-negative whole number.', 400);
    }

    if (!isNonNegativeInteger(maxMascots)) {
      throw createHttpError('Maximum mascots must be a non-negative whole number.', 400);
    }

    if (minMascots > maxMascots) {
      throw createHttpError('Minimum mascots cannot be greater than maximum mascots.', 400);
    }

    if (!isNonNegativeNumber(basePrice)) {
      throw createHttpError('Base price must be a non-negative number.', 400);
    }

    return packageRepository.update(Number(id), {
      title,
      description,
      category,
      duration_minutes: durationMinutes,
      min_mascots: minMascots,
      max_mascots: maxMascots,
      base_price: basePrice,
      is_active:
        payload.is_active !== undefined
          ? Boolean(payload.is_active)
          : existing.is_active,
    });
  }

  async delete(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid package id is required.', 400);
    }

    const deleted = await packageRepository.delete(Number(id));

    if (!deleted) {
      throw createHttpError('Package not found.', 404);
    }

    return deleted;
  }
}

module.exports = new PackageService();