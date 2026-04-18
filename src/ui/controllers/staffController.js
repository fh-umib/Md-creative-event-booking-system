const staffService = require('../../services/staffService');

function createBadRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function parseStaffId(idParam) {
  const staffId = Number(idParam);

  if (!Number.isInteger(staffId) || staffId <= 0) {
    throw createBadRequest('A valid staff id is required.');
  }

  return staffId;
}

class StaffController {
  async getPublicStaff(req, res, next) {
    try {
      const data = await staffService.getPublicStaffWithStats();

      return res.status(200).json({
        success: true,
        message: 'Public staff data fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await staffService.getAll();

      return res.status(200).json({
        success: true,
        message: 'Staff members fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const staffId = parseStaffId(req.params.id);
      const data = await staffService.getById(staffId);

      return res.status(200).json({
        success: true,
        message: 'Staff member fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await staffService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Staff member created successfully.',
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const staffId = parseStaffId(req.params.id);
      const updated = await staffService.update(staffId, req.body);

      return res.status(200).json({
        success: true,
        message: 'Staff member updated successfully.',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const staffId = parseStaffId(req.params.id);
      const deleted = await staffService.delete(staffId);

      return res.status(200).json({
        success: true,
        message: 'Staff member deleted successfully.',
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StaffController();