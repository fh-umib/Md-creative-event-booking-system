const decorationRepository = require('../data/repositories/PgDecorationRepository');

function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

class DecorationService {
  async getAllPublic() {
    return decorationRepository.getAll();
  }

  async getAllAdmin() {
    return decorationRepository.getAllAdmin();
  }

  async getById(id) {
    return decorationRepository.getById(Number(id));
  }

  async getBySlug(slug) {
    return decorationRepository.getBySlug(slug);
  }

  async create(payload) {
    const title = payload.title?.trim();
    const category = payload.category?.trim();

    if (!title) {
      throw new Error('Title is required.');
    }

    if (!category) {
      throw new Error('Category is required.');
    }

    const slug = payload.slug?.trim() || createSlug(title);

    return decorationRepository.create({
      title,
      slug,
      category,
      short_description: payload.short_description?.trim() || '',
      full_description: payload.full_description?.trim() || '',
      image_url: payload.image_url?.trim() || '',
      price_from: Number(payload.price_from || 0),
      theme_colors: payload.theme_colors?.trim() || '',
      is_featured: Boolean(payload.is_featured),
      is_active: payload.is_active !== false,
    });
  }

  async update(id, payload) {
    const existing = await decorationRepository.getById(Number(id));

    if (!existing) {
      throw new Error('Decoration not found.');
    }

    const title = payload.title?.trim() || existing.title;
    const category = payload.category?.trim() || existing.category;
    const slug = payload.slug?.trim() || createSlug(title);

    return decorationRepository.update(Number(id), {
      title,
      slug,
      category,
      short_description: payload.short_description ?? existing.short_description,
      full_description: payload.full_description ?? existing.full_description,
      image_url: payload.image_url ?? existing.image_url,
      price_from:
        payload.price_from !== undefined
          ? Number(payload.price_from)
          : Number(existing.price_from),
      theme_colors: payload.theme_colors ?? existing.theme_colors,
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
    const deleted = await decorationRepository.delete(Number(id));

    if (!deleted) {
      throw new Error('Decoration not found.');
    }

    return deleted;
  }
}

module.exports = new DecorationService();