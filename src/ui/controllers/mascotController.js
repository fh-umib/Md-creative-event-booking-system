const mascotService = require('../../services/mascotService');

class MascotController {
  async getAllPublic(req, res, next) {
    try {
      const data = await mascotService.getAllPublic();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllAdmin(req, res, next) {
    try {
      const data = await mascotService.getAllAdmin();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const item = await mascotService.getById(req.params.id);

      if (!item) {
        return res.status(404).json({ message: 'Mascot not found.' });
      }

      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await mascotService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updated = await mascotService.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await mascotService.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MascotController();