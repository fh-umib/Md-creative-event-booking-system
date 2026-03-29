const fileMascotRepository = require('../data/repositories/FileMascotRepository');

class MascotService {
  constructor(mascotRepository) {
    this.mascotRepository = mascotRepository;
  }

  listMascots(filters = {}) {
    let mascots = this.mascotRepository.getAll();

    if (filters.name) {
      mascots = mascots.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.maxPrice) {
      mascots = mascots.filter(
        (item) => Number(item.price) <= Number(filters.maxPrice)
      );
    }

    return mascots;
  }

  getMascotById(id) {
    const item = this.mascotRepository.getById(id);

    if (!item) {
      throw new Error('Mascot not found');
    }

    return item;
  }

  createMascot(data) {
    if (!data.name || !data.name.trim()) {
      throw new Error('Mascot name is required');
    }

    if (data.price === undefined || Number(data.price) <= 0) {
      throw new Error('Mascot price must be greater than 0');
    }

    return this.mascotRepository.add({
      name: data.name.trim(),
      description: data.description || '',
      price: Number(data.price),
      imageUrl: data.imageUrl || '',
      isActive: data.isActive !== undefined ? data.isActive : true,
    });
  }

  updateMascot(id, data) {
    if (!data.name || !data.name.trim()) {
      throw new Error('Mascot name is required');
    }

    if (data.price === undefined || Number(data.price) <= 0) {
      throw new Error('Mascot price must be greater than 0');
    }

    const updated = this.mascotRepository.update(id, {
      name: data.name.trim(),
      description: data.description || '',
      price: Number(data.price),
      imageUrl: data.imageUrl || '',
      isActive: data.isActive !== undefined ? String(data.isActive) : 'true',
    });

    if (!updated) {
      throw new Error('Mascot not found');
    }

    return updated;
  }

  deleteMascot(id) {
    const deleted = this.mascotRepository.delete(id);

    if (!deleted) {
      throw new Error('Mascot not found');
    }

    return { message: 'Mascot deleted successfully' };
  }
}

module.exports = new MascotService(fileMascotRepository);
module.exports.MascotService = MascotService;