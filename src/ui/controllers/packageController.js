const packageService = require('../../services/packageService');

class PackageController {
  async getAllAdmin(req, res, next) {
    try {
      const data = await packageService.getAllAdmin(req.query.search || '');
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getPublicCategories(req, res, next) {
    try {
      const data = await packageService.getPublicCategories();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getByCategory(req, res, next) {
    try {
      const data = await packageService.getByCategory(req.params.category);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const item = await packageService.getById(req.params.id);

      if (!item) {
        return res.status(404).json({ message: 'Package not found.' });
      }

      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await packageService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updated = await packageService.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await packageService.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PackageController();