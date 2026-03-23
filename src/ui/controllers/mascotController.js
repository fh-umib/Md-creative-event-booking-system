const mascotService = require("../../services/mascotService");

class MascotController {
  async getAll(req, res) {
    try {
      const mascots = await mascotService.getAll();
      res.status(200).json(mascots);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const mascot = await mascotService.create(req.body);
      res.status(201).json(mascot);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new MascotController();