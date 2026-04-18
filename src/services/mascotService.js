const mascotRepository = require('../data/repositories/PgMascotRepository');

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

function isNonNegativeInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) >= 0;
}

class MascotService {
  async getAllPublic() {
    return mascotRepository.getAllPublic();
  }

  async getAllAdmin() {
    return mascotRepository.getAllAdmin();
  }

  async getById(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid mascot id is required.', 400);
    }

    return mascotRepository.getById(Number(id));
  }

  async create(payload) {
    const name = normalizeString(payload.name);
    const characterName = normalizeString(payload.character_name);
    const theme = payload.theme !== undefined ? normalizeString(payload.theme) : '';
    const description =
      payload.description !== undefined ? normalizeString(payload.description) : '';
    const price = payload.price !== undefined ? Number(payload.price) : 0;
    const durationMinutes =
      payload.duration_minutes !== undefined ? Number(payload.duration_minutes) : 60;

    const minAge =
      payload.min_age !== undefined && payload.min_age !== ''
        ? Number(payload.min_age)
        : null;

    const maxAge =
      payload.max_age !== undefined && payload.max_age !== ''
        ? Number(payload.max_age)
        : null;

    if (!name) {
      throw createHttpError('Name is required.', 400);
    }

    if (!characterName) {
      throw createHttpError('Character name is required.', 400);
    }

    if (!isNonNegativeNumber(price)) {
      throw createHttpError('Price must be a non-negative number.', 400);
    }

    if (!isPositiveInteger(durationMinutes)) {
      throw createHttpError('Duration minutes must be a positive whole number.', 400);
    }

    if (minAge !== null && !isNonNegativeInteger(minAge)) {
      throw createHttpError('Minimum age must be a non-negative whole number.', 400);
    }

    if (maxAge !== null && !isNonNegativeInteger(maxAge)) {
      throw createHttpError('Maximum age must be a non-negative whole number.', 400);
    }

    if (minAge !== null && maxAge !== null && minAge > maxAge) {
      throw createHttpError('Minimum age cannot be greater than maximum age.', 400);
    }

    return mascotRepository.create({
      name,
      character_name: characterName,
      theme,
      description,
      price,
      duration_minutes: durationMinutes,
      min_age: minAge,
      max_age: maxAge,
      is_available: payload.is_available !== false,
    });
  }

  async update(id, payload) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid mascot id is required.', 400);
    }

    const existing = await mascotRepository.getById(Number(id));

    if (!existing) {
      throw createHttpError('Mascot not found.', 404);
    }

    const name =
      payload.name !== undefined ? normalizeString(payload.name) : existing.name;

    const characterName =
      payload.character_name !== undefined
        ? normalizeString(payload.character_name)
        : existing.character_name;

    const theme =
      payload.theme !== undefined ? normalizeString(payload.theme) : existing.theme;

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

    const minAge =
      payload.min_age !== undefined
        ? payload.min_age !== ''
          ? Number(payload.min_age)
          : null
        : existing.min_age;

    const maxAge =
      payload.max_age !== undefined
        ? payload.max_age !== ''
          ? Number(payload.max_age)
          : null
        : existing.max_age;

    if (!name) {
      throw createHttpError('Name is required.', 400);
    }

    if (!characterName) {
      throw createHttpError('Character name is required.', 400);
    }

    if (!isNonNegativeNumber(price)) {
      throw createHttpError('Price must be a non-negative number.', 400);
    }

    if (!isPositiveInteger(durationMinutes)) {
      throw createHttpError('Duration minutes must be a positive whole number.', 400);
    }

    if (minAge !== null && !isNonNegativeInteger(minAge)) {
      throw createHttpError('Minimum age must be a non-negative whole number.', 400);
    }

    if (maxAge !== null && !isNonNegativeInteger(maxAge)) {
      throw createHttpError('Maximum age must be a non-negative whole number.', 400);
    }

    if (minAge !== null && maxAge !== null && minAge > maxAge) {
      throw createHttpError('Minimum age cannot be greater than maximum age.', 400);
    }

    return mascotRepository.update(Number(id), {
      name,
      character_name: characterName,
      theme,
      description,
      price,
      duration_minutes: durationMinutes,
      min_age: minAge,
      max_age: maxAge,
      is_available:
        payload.is_available !== undefined
          ? Boolean(payload.is_available)
          : existing.is_available,
    });
  }

  async delete(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid mascot id is required.', 400);
    }

    const deleted = await mascotRepository.delete(Number(id));

    if (!deleted) {
      throw createHttpError('Mascot not found.', 404);
    }

    return deleted;
  }
}

module.exports = new MascotService();