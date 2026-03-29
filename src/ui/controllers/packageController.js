const packageService = require('../../services/packageService');

const getAll = (req, res) => {
  try {
    const packages = packageService.listPackages(req.query);
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = (req, res) => {
  try {
    const item = packageService.getPackageById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = (req, res) => {
  try {
    const item = packageService.createPackage(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = (req, res) => {
  try {
    const item = packageService.updatePackage(req.params.id, req.body);
    res.status(200).json(item);
  } catch (error) {
    const status = error.message === 'Package not found' ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

const remove = (req, res) => {
  try {
    const result = packageService.deletePackage(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};