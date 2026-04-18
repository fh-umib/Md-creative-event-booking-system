const activityService = require('../../services/activityService');

function createBadRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function parseActivityId(idParam) {
  const activityId = Number(idParam);

  if (!Number.isInteger(activityId) || activityId <= 0) {
    throw createBadRequest('A valid activity id is required.');
  }

  return activityId;
}

class ActivityController {
  async getAllPublic(req, res, next) {
    try {
      const data = await activityService.getAllPublic();

      return res.status(200).json({
        success: true,
        message: 'Activities fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllAdmin(req, res, next) {
    try {
      const data = await activityService.getAllAdmin();

      return res.status(200).json({
        success: true,
        message: 'Admin activities fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const activityId = parseActivityId(req.params.id);
      const item = await activityService.getById(activityId);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Activity not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Activity fetched successfully.',
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await activityService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Activity created successfully.',
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const activityId = parseActivityId(req.params.id);
      const updated = await activityService.update(activityId, req.body);

      return res.status(200).json({
        success: true,
        message: 'Activity updated successfully.',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const activityId = parseActivityId(req.params.id);
      const deleted = await activityService.delete(activityId);

      return res.status(200).json({
        success: true,
        message: 'Activity deleted successfully.',
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ActivityController();