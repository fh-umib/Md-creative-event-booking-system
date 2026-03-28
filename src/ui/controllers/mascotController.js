const mascotService = require("../../services/mascotService");

class MascotController {
  async getAll(req, res) {
    try {
      const mascots = mascotService.list(req.query);
      res.status(200).json(mascots);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const mascot = mascotService.getById(req.params.id);
      res.status(200).json(mascot);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const mascot = mascotService.add(req.body);
      res.status(201).json(mascot);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const mascot = mascotService.update(req.params.id, req.body);
      res.status(200).json(mascot);
    } catch (error) {
      const status = error.message === "Mascot not found" ? 404 : 400;
      res.status(status).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      mascotService.delete(req.params.id);
      res.status(200).json({ message: "Mascot deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new MascotController();