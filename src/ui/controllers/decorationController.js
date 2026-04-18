const decorationService = require('../../services/decorationService');

function createBadRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function parseDecorationId(idParam) {
  const decorationId = Number(idParam);

  if (!Number.isInteger(decorationId) || decorationId <= 0) {
    throw createBadRequest('A valid decoration id is required.');
  }

  return decorationId;
}

class DecorationController {
  async getAllPublic(req, res, next) {
    try {
      const data = await decorationService.getAllPublic();

      return res.status(200).json({
        success: true,
        message: 'Decorations fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllAdmin(req, res, next) {
    try {
      const data = await decorationService.getAllAdmin();

      return res.status(200).json({
        success: true,
        message: 'Admin decorations fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const decorationId = parseDecorationId(req.params.id);
      const item = await decorationService.getById(decorationId);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Decoration not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Decoration fetched successfully.',
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req, res, next) {
    try {
      const slug = req.params.slug ? String(req.params.slug).trim() : '';
      const item = await decorationService.getBySlug(slug);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Decoration not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Decoration fetched successfully.',
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await decorationService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Decoration created successfully.',
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const decorationId = parseDecorationId(req.params.id);
      const updated = await decorationService.update(decorationId, req.body);

      return res.status(200).json({
        success: true,
        message: 'Decoration updated successfully.',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const decorationId = parseDecorationId(req.params.id);
      const deleted = await decorationService.delete(decorationId);

      return res.status(200).json({
        success: true,
        message: 'Decoration deleted successfully.',
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DecorationController();