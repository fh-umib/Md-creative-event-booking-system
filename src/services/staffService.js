const staffRepository = require('../data/repositories/staffRepository');

function createHttpError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeString(value) {
  return value !== undefined && value !== null ? String(value).trim() : '';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isNonNegativeInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) >= 0;
}

class StaffService {
  validateStaffInput(data) {
    const fullName = normalizeString(data.full_name);
    const role = normalizeString(data.role);
    const email = data.email !== undefined && data.email !== null
      ? normalizeString(data.email)
      : '';
    const displayOrder =
      data.display_order !== undefined ? Number(data.display_order) : 0;

    if (!fullName) {
      throw createHttpError('Full name is required.', 400);
    }

    if (!role) {
      throw createHttpError('Role is required.', 400);
    }

    if (email && !isValidEmail(email)) {
      throw createHttpError('A valid email address is required.', 400);
    }

    if (!isNonNegativeInteger(displayOrder)) {
      throw createHttpError('Display order must be a non-negative whole number.', 400);
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
    return staffRepository.getAll();
  }

  async getById(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid staff id is required.', 400);
    }

    const staff = await staffRepository.getById(Number(id));

    if (!staff) {
      throw createHttpError('Staff member not found.', 404);
    }

    return staff;
  }

  async create(data) {
    this.validateStaffInput(data);

    return staffRepository.create({
      full_name: normalizeString(data.full_name),
      role: normalizeString(data.role),
      bio: data.bio !== undefined ? normalizeString(data.bio) : null,
      image_url: data.image_url !== undefined ? normalizeString(data.image_url) : null,
      email: data.email !== undefined ? normalizeString(data.email) : null,
      phone: data.phone !== undefined ? normalizeString(data.phone) : null,
      is_active: data.is_active !== false,
      display_order:
        data.display_order !== undefined ? Number(data.display_order) : 0,
    });
  }

  async update(id, data) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid staff id is required.', 400);
    }

    const existing = await staffRepository.getById(Number(id));

    if (!existing) {
      throw createHttpError('Staff member not found.', 404);
    }

    const mergedData = {
      full_name:
        data.full_name !== undefined ? data.full_name : existing.full_name,
      role: data.role !== undefined ? data.role : existing.role,
      bio: data.bio !== undefined ? data.bio : existing.bio,
      image_url: data.image_url !== undefined ? data.image_url : existing.image_url,
      email: data.email !== undefined ? data.email : existing.email,
      phone: data.phone !== undefined ? data.phone : existing.phone,
      is_active:
        data.is_active !== undefined ? data.is_active : existing.is_active,
      display_order:
        data.display_order !== undefined
          ? data.display_order
          : existing.display_order,
    };

    this.validateStaffInput(mergedData);

    return staffRepository.update(Number(id), {
      full_name: normalizeString(mergedData.full_name),
      role: normalizeString(mergedData.role),
      bio:
        mergedData.bio !== undefined && mergedData.bio !== null
          ? normalizeString(mergedData.bio)
          : null,
      image_url:
        mergedData.image_url !== undefined && mergedData.image_url !== null
          ? normalizeString(mergedData.image_url)
          : null,
      email:
        mergedData.email !== undefined && mergedData.email !== null
          ? normalizeString(mergedData.email)
          : null,
      phone:
        mergedData.phone !== undefined && mergedData.phone !== null
          ? normalizeString(mergedData.phone)
          : null,
      is_active:
        mergedData.is_active !== undefined
          ? Boolean(mergedData.is_active)
          : true,
      display_order: Number(mergedData.display_order),
    });
  }

  async delete(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw createHttpError('A valid staff id is required.', 400);
    }

    const existing = await staffRepository.getById(Number(id));

    if (!existing) {
      throw createHttpError('Staff member not found.', 404);
    }

    return staffRepository.delete(Number(id));
  }
}

module.exports = new StaffService();