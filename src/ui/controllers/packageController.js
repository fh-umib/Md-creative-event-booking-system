const packageService = require('../../services/packageService');

function createBadRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function parsePackageId(idParam) {
  const packageId = Number(idParam);

  if (!Number.isInteger(packageId) || packageId <= 0) {
    throw createBadRequest('A valid package id is required.');
  }

  return packageId;
}

class PackageController {
  async getAllAdmin(req, res, next) {
    try {
      const search = req.query.search ? String(req.query.search).trim() : '';
      const data = await packageService.getAllAdmin(search);

      return res.status(200).json({
        success: true,
        message: 'Packages fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPublicPackages(req, res, next) {
    try {
      const data = await packageService.getAllPublicPackages();

      return res.status(200).json({
        success: true,
        message: 'Public packages fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPublicCategories(req, res, next) {
    try {
      const data = await packageService.getPublicCategories();

      return res.status(200).json({
        success: true,
        message: 'Public package categories fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByCategory(req, res, next) {
    try {
      const category = req.params.category ? String(req.params.category).trim() : '';
      const data = await packageService.getByCategory(category);

      return res.status(200).json({
        success: true,
        message: 'Packages by category fetched successfully.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const packageId = parsePackageId(req.params.id);
      const item = await packageService.getById(packageId);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Package not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Package fetched successfully.',
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await packageService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Package created successfully.',
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const packageId = parsePackageId(req.params.id);
      const updated = await packageService.update(packageId, req.body);

      return res.status(200).json({
        success: true,
        message: 'Package updated successfully.',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const packageId = parsePackageId(req.params.id);
      const deleted = await packageService.delete(packageId);

      return res.status(200).json({
        success: true,
        message: 'Package deleted successfully.',
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PackageController();