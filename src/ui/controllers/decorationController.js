const decorationService = require('../../services/decorationService');

class DecorationController {
  async getAllPublic(req, res, next) {
    try {
      const data = await decorationService.getAllPublic();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllAdmin(req, res, next) {
    try {
      const data = await decorationService.getAllAdmin();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const item = await decorationService.getById(req.params.id);

      if (!item) {
        return res.status(404).json({ message: 'Decoration not found.' });
      }

      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req, res, next) {
    try {
      const item = await decorationService.getBySlug(req.params.slug);

      if (!item) {
        return res.status(404).json({ message: 'Decoration not found.' });
      }

      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await decorationService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updated = await decorationService.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await decorationService.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DecorationController();