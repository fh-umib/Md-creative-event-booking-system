const activityRepository = require('../data/repositories/PgActivityRepository');

function createHttpError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeString(value) {
  return value !== undefined && value !== null ? String(value).trim() : '';
}

function isNonNegativeNumber(value) {
  return !Number.isNaN(Number(value)) && Number(value) >= 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}

class ActivityService {
  async getAllPublic() {
    return activityRepository.getAllPublic();
  }

  async getAllAdmin() {
    return activityRepository.getAllAdmin();
  }

  async getById(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid activity id is required.', 400);
    }

    return activityRepository.getById(Number(id));
  }

  async create(payload) {
    const name = normalizeString(payload.name);
    const description =
      payload.description !== undefined ? normalizeString(payload.description) : '';
    const price = payload.price !== undefined ? Number(payload.price) : 0;
    const durationMinutes =
      payload.duration_minutes !== undefined ? Number(payload.duration_minutes) : 30;

    if (!name) {
      throw createHttpError('Activity name is required.', 400);
    }

    if (!isNonNegativeNumber(price)) {
      throw createHttpError('Price must be a non-negative number.', 400);
    }

    if (!isPositiveInteger(durationMinutes)) {
      throw createHttpError('Duration minutes must be a positive whole number.', 400);
    }

    return activityRepository.create({
      name,
      description,
      price,
      duration_minutes: durationMinutes,
      is_active: payload.is_active !== false,
    });
  }

  async update(id, payload) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid activity id is required.', 400);
    }

    const existing = await activityRepository.getById(Number(id));

    if (!existing) {
      throw createHttpError('Activity not found.', 404);
    }

    const name =
      payload.name !== undefined ? normalizeString(payload.name) : existing.name;

    const description =
      payload.description !== undefined
        ? normalizeString(payload.description)
        : existing.description;

    const price =
      payload.price !== undefined ? Number(payload.price) : Number(existing.price);

    const durationMinutes =
      payload.duration_minutes !== undefined
        ? Number(payload.duration_minutes)
        : Number(existing.duration_minutes);

    if (!name) {
      throw createHttpError('Activity name is required.', 400);
    }

    if (!isNonNegativeNumber(price)) {
      throw createHttpError('Price must be a non-negative number.', 400);
    }

    if (!isPositiveInteger(durationMinutes)) {
      throw createHttpError('Duration minutes must be a positive whole number.', 400);
    }

    return activityRepository.update(Number(id), {
      name,
      description,
      price,
      duration_minutes: durationMinutes,
      is_active:
        payload.is_active !== undefined
          ? Boolean(payload.is_active)
          : existing.is_active,
    });
  }

  async delete(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid activity id is required.', 400);
    }

    const deleted = await activityRepository.delete(Number(id));

    if (!deleted) {
      throw createHttpError('Activity not found.', 404);
    }

    return deleted;
  }
}

module.exports = new ActivityService();