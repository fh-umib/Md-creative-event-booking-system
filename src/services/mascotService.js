const mascotRepository = require('../data/repositories/PgMascotRepository');

class MascotService {
  async getAllPublic() {
    return mascotRepository.getAllPublic();
  }

  async getAllAdmin() {
    return mascotRepository.getAllAdmin();
  }

  async getById(id) {
    return mascotRepository.getById(Number(id));
  }

  async create(payload) {
    const name = payload.name?.trim();
    const character_name = payload.character_name?.trim();

    if (!name) {
      throw new Error('Name is required.');
    }

    if (!character_name) {
      throw new Error('Character name is required.');
    }

    return mascotRepository.create({
      name,
      character_name,
      theme: payload.theme?.trim() || '',
      description: payload.description?.trim() || '',
      price: Number(payload.price || 0),
      duration_minutes: Number(payload.duration_minutes || 60),
      min_age:
        payload.min_age !== undefined && payload.min_age !== ''
          ? Number(payload.min_age)
          : null,
      max_age:
        payload.max_age !== undefined && payload.max_age !== ''
          ? Number(payload.max_age)
          : null,
      is_available: payload.is_available !== false,
    });
  }

  async update(id, payload) {
    const existing = await mascotRepository.getById(Number(id));

    if (!existing) {
      throw new Error('Mascot not found.');
    }

    return mascotRepository.update(Number(id), {
      name: payload.name?.trim() || existing.name,
      character_name: payload.character_name?.trim() || existing.character_name,
      theme: payload.theme !== undefined ? payload.theme.trim() : existing.theme,
      description:
        payload.description !== undefined
          ? payload.description.trim()
          : existing.description,
      price:
        payload.price !== undefined ? Number(payload.price) : Number(existing.price),
      duration_minutes:
        payload.duration_minutes !== undefined
          ? Number(payload.duration_minutes)
          : Number(existing.duration_minutes),
      min_age:
        payload.min_age !== undefined && payload.min_age !== ''
          ? Number(payload.min_age)
          : existing.min_age,
      max_age:
        payload.max_age !== undefined && payload.max_age !== ''
          ? Number(payload.max_age)
          : existing.max_age,
      is_available:
        payload.is_available !== undefined
          ? Boolean(payload.is_available)
          : existing.is_available,
    });
  }

  async delete(id) {
    const deleted = await mascotRepository.delete(Number(id));

    if (!deleted) {
      throw new Error('Mascot not found.');
    }

    return deleted;
  }
}

module.exports = new MascotService();