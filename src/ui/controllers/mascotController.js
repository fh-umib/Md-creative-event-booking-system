const mascotService = require('../../services/mascotService');

function createBadRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function parseMascotId(idParam) {
  const mascotId = Number(idParam);

  if (!Number.isInteger(mascotId) || mascotId <= 0) {
    throw createBadRequest('A valid mascot id is required.');
  }

  return mascotId;
}

class MascotController {
  async getAllPublic(req, res, next) {
    try {
      const data = await mascotService.getAllPublic();

      return res.status(200).json({
        success: true,
        message: 'Mascots fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllAdmin(req, res, next) {
    try {
      const data = await mascotService.getAllAdmin();

      return res.status(200).json({
        success: true,
        message: 'Admin mascots fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const mascotId = parseMascotId(req.params.id);
      const item = await mascotService.getById(mascotId);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Mascot not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Mascot fetched successfully.',
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await mascotService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Mascot created successfully.',
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const mascotId = parseMascotId(req.params.id);
      const updated = await mascotService.update(mascotId, req.body);

      return res.status(200).json({
        success: true,
        message: 'Mascot updated successfully.',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const mascotId = parseMascotId(req.params.id);
      const deleted = await mascotService.delete(mascotId);

      return res.status(200).json({
        success: true,
        message: 'Mascot deleted successfully.',
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MascotController();