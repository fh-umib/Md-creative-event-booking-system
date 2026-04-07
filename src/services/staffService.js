const staffRepository = require("../data/repositories/staffRepository");

class StaffService {
  validateStaffInput(data) {
    if (!data.full_name || !data.full_name.trim()) {
      throw new Error("Full name is required");
    }

    if (!data.role || !data.role.trim()) {
      throw new Error("Role is required");
    }
  }

  async getPublicStaffWithStats() {
    const [staff, stats, reviews] = await Promise.all([
      staffRepository.getPublicStaff(),
      staffRepository.getStats(),
      staffRepository.getApprovedReviews(),
    ]);

    return {
      staff,
      stats,
      reviews,
    };
  }

  async getAll() {
    return await staffRepository.getAll();
  }

  async getById(id) {
    const staff = await staffRepository.getById(id);

    if (!staff) {
      throw new Error("Staff member not found");
    }

    return staff;
  }

  async create(data) {
    this.validateStaffInput(data);
    return await staffRepository.create(data);
  }

  async update(id, data) {
    this.validateStaffInput(data);

    const existing = await staffRepository.getById(id);
    if (!existing) {
      throw new Error("Staff member not found");
    }

    return await staffRepository.update(id, data);
  }

  async delete(id) {
    const existing = await staffRepository.getById(id);
    if (!existing) {
      throw new Error("Staff member not found");
    }

    return await staffRepository.delete(id);
  }
}

module.exports = new StaffService();