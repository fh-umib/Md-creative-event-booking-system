const decorationRepository = require('../data/repositories/PgDecorationRepository');

function createSlug(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

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

class DecorationService {
  async getAllPublic() {
    return decorationRepository.getAll();
  }

  async getAllAdmin() {
    return decorationRepository.getAllAdmin();
  }

  async getById(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid decoration id is required.', 400);
    }

    return decorationRepository.getById(Number(id));
  }

  async getBySlug(slug) {
    const normalizedSlug = normalizeString(slug);

    if (!normalizedSlug) {
      throw createHttpError('Decoration slug is required.', 400);
    }

    return decorationRepository.getBySlug(normalizedSlug);
  }

  async create(payload) {
    const title = normalizeString(payload.title);
    const category = normalizeString(payload.category);
    const shortDescription =
      payload.short_description !== undefined
        ? normalizeString(payload.short_description)
        : '';
    const fullDescription =
      payload.full_description !== undefined
        ? normalizeString(payload.full_description)
        : '';
    const imageUrl =
      payload.image_url !== undefined ? normalizeString(payload.image_url) : '';
    const themeColors =
      payload.theme_colors !== undefined ? normalizeString(payload.theme_colors) : '';
    const priceFrom =
      payload.price_from !== undefined ? Number(payload.price_from) : 0;

    if (!title) {
      throw createHttpError('Title is required.', 400);
    }

    if (!category) {
      throw createHttpError('Category is required.', 400);
    }

    if (!isNonNegativeNumber(priceFrom)) {
      throw createHttpError('Price from must be a non-negative number.', 400);
    }

    const slug = normalizeString(payload.slug) || createSlug(title);

    return decorationRepository.create({
      title,
      slug,
      category,
      short_description: shortDescription,
      full_description: fullDescription,
      image_url: imageUrl,
      price_from: priceFrom,
      theme_colors: themeColors,
      is_featured: Boolean(payload.is_featured),
      is_active: payload.is_active !== false,
    });
  }

  async update(id, payload) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid decoration id is required.', 400);
    }

    const existing = await decorationRepository.getById(Number(id));

    if (!existing) {
      throw createHttpError('Decoration not found.', 404);
    }

    const title =
      payload.title !== undefined ? normalizeString(payload.title) : existing.title;

    const category =
      payload.category !== undefined
        ? normalizeString(payload.category)
        : existing.category;

    if (!title) {
      throw createHttpError('Title is required.', 400);
    }

    if (!category) {
      throw createHttpError('Category is required.', 400);
    }

    const priceFrom =
      payload.price_from !== undefined
        ? Number(payload.price_from)
        : Number(existing.price_from);

    if (!isNonNegativeNumber(priceFrom)) {
      throw createHttpError('Price from must be a non-negative number.', 400);
    }

    const slug = normalizeString(payload.slug) || createSlug(title);

    return decorationRepository.update(Number(id), {
      title,
      slug,
      category,
      short_description:
        payload.short_description !== undefined
          ? normalizeString(payload.short_description)
          : existing.short_description,
      full_description:
        payload.full_description !== undefined
          ? normalizeString(payload.full_description)
          : existing.full_description,
      image_url:
        payload.image_url !== undefined
          ? normalizeString(payload.image_url)
          : existing.image_url,
      price_from: priceFrom,
      theme_colors:
        payload.theme_colors !== undefined
          ? normalizeString(payload.theme_colors)
          : existing.theme_colors,
      is_featured:
        payload.is_featured !== undefined
          ? Boolean(payload.is_featured)
          : existing.is_featured,
      is_active:
        payload.is_active !== undefined
          ? Boolean(payload.is_active)
          : existing.is_active,
    });
  }

  async delete(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid decoration id is required.', 400);
    }

    const deleted = await decorationRepository.delete(Number(id));

    if (!deleted) {
      throw createHttpError('Decoration not found.', 404);
    }

    return deleted;
  }
}

module.exports = new DecorationService();