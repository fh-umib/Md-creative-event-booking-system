const packageService = require("../../services/packageService");

class PackageController {
  async getAll(req, res) {
    try {
      const packages = await packageService.getAll();
      res.status(200).json(packages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const pkg = await packageService.create(req.body);
      res.status(201).json(pkg);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new PackageController();