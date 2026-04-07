const staffService = require('../../services/staffService');

class StaffController {
  async getPublicStaff(req, res, next) {
    try {
      const data = await staffService.getPublicStaffWithStats();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await staffService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const data = await staffService.getById(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await staffService.create(req.body);
      return res.status(201).json({
        message: 'Staff member created successfully',
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const updated = await staffService.update(id, req.body);
      return res.status(200).json({
        message: 'Staff member updated successfully',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number(req.params.id);
      await staffService.delete(id);
      return res.status(200).json({
        message: 'Staff member deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StaffController();