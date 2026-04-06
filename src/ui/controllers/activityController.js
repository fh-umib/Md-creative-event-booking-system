const activityService = require('../../services/activityService');

class ActivityController {
  async getAllPublic(req, res, next) {
    try {
      const data = await activityService.getAllPublic();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllAdmin(req, res, next) {
    try {
      const data = await activityService.getAllAdmin();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const item = await activityService.getById(req.params.id);

      if (!item) {
        return res.status(404).json({ message: 'Activity not found.' });
      }

      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const created = await activityService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updated = await activityService.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await activityService.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ActivityController();