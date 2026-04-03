const packageService = require('../../services/packageService');

class PackageController {
  async getAll(req, res, next) {
    try {
      const filters = {
        category: req.query.category || undefined,
        search: req.query.search || undefined,
        isActive:
          req.query.isActive !== undefined
            ? req.query.isActive === 'true'
            : undefined,
      };

      const packages = await packageService.getAll(filters);

      return res.status(200).json({
        success: true,
        message: 'Packages fetched successfully.',
        data: packages,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const packageId = Number(req.params.id);
      const packageItem = await packageService.getById(packageId);

      return res.status(200).json({
        success: true,
        message: 'Package fetched successfully.',
        data: packageItem,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const createdPackage = await packageService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Package created successfully.',
        data: createdPackage,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const packageId = Number(req.params.id);
      const updatedPackage = await packageService.update(packageId, req.body);

      return res.status(200).json({
        success: true,
        message: 'Package updated successfully.',
        data: updatedPackage,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const packageId = Number(req.params.id);
      const result = await packageService.delete(packageId);

      return res.status(200).json({
        success: true,
        message: 'Package deleted successfully.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PackageController();