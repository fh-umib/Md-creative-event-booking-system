const mascotService = require('../../services/mascotService');

const getAll = (req, res) => {
  try {
    const mascots = mascotService.listMascots(req.query);
    res.status(200).json(mascots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = (req, res) => {
  try {
    const item = mascotService.getMascotById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = (req, res) => {
  try {
    const item = mascotService.createMascot(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = (req, res) => {
  try {
    const item = mascotService.updateMascot(req.params.id, req.body);
    res.status(200).json(item);
  } catch (error) {
    const status = error.message === 'Mascot not found' ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

const remove = (req, res) => {
  try {
    const result = mascotService.deleteMascot(req.params.id);
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