const activityRepository = require('../data/repositories/PgActivityRepository');

class ActivityService {
  async getAllPublic() {
    return activityRepository.getAllPublic();
  }

  async getAllAdmin() {
    return activityRepository.getAllAdmin();
  }

  async getById(id) {
    return activityRepository.getById(Number(id));
  }

  async create(payload) {
    const name = payload.name?.trim();

    if (!name) {
      throw new Error('Activity name is required.');
    }

    return activityRepository.create({
      name,
      description: payload.description?.trim() || '',
      price: Number(payload.price || 0),
      duration_minutes: Number(payload.duration_minutes || 30),
      is_active: payload.is_active !== false,
    });
  }

  async update(id, payload) {
    const existing = await activityRepository.getById(Number(id));

    if (!existing) {
      throw new Error('Activity not found.');
    }

    return activityRepository.update(Number(id), {
      name: payload.name?.trim() || existing.name,
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
      is_active:
        payload.is_active !== undefined
          ? Boolean(payload.is_active)
          : existing.is_active,
    });
  }

  async delete(id) {
    const deleted = await activityRepository.delete(Number(id));

    if (!deleted) {
      throw new Error('Activity not found.');
    }

    return deleted;
  }
}

module.exports = new ActivityService();