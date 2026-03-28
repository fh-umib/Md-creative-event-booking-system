const path = require("path");
const Mascot = require("../models/Mascot");
const FileMascotRepository = require("../data/repositories/FileMascotRepository");

class MascotService {
  constructor(repository) {
    this.repository = repository;
  }

  list(filter = {}) {
    let mascots = this.repository.getAll();

    if (filter.isAvailable !== undefined && filter.isAvailable !== "") {
      const availability =
        String(filter.isAvailable).toLowerCase() === "true";
      mascots = mascots.filter((item) => item.isAvailable === availability);
    }

    if (filter.theme) {
      mascots = mascots.filter(
        (item) =>
          item.theme &&
          item.theme.toLowerCase().includes(String(filter.theme).toLowerCase())
      );
    }

    if (filter.characterName) {
      mascots = mascots.filter((item) =>
        item.characterName
          .toLowerCase()
          .includes(String(filter.characterName).toLowerCase())
      );
    }

    return mascots;
  }

  getById(id) {
    const mascot = this.repository.getById(id);

    if (!mascot) {
      throw new Error("Mascot not found");
    }

    return mascot;
  }

  add(data) {
    this.validateMascot(data);

    const allMascots = this.repository.getAll();
    const nextId =
      allMascots.length > 0
        ? Math.max(...allMascots.map((item) => Number(item.id))) + 1
        : 1;

    const mascot = new Mascot({
      id: nextId,
      name: data.name.trim(),
      characterName: data.characterName.trim(),
      theme: data.theme ? data.theme.trim() : null,
      description: data.description ? data.description.trim() : "",
      price: Number(data.price),
      durationMinutes: data.durationMinutes ? Number(data.durationMinutes) : 60,
      minAge: data.minAge ? Number(data.minAge) : null,
      maxAge: data.maxAge ? Number(data.maxAge) : null,
      isAvailable:
        typeof data.isAvailable === "boolean"
          ? data.isAvailable
          : String(data.isAvailable).toLowerCase() === "true",
      image: data.image ? data.image.trim() : "",
    });

    return this.repository.add(mascot);
  }

  update(id, data) {
    const existingMascot = this.repository.getById(id);

    if (!existingMascot) {
      throw new Error("Mascot not found");
    }

    const mergedData = {
      ...existingMascot,
      ...data,
    };

    this.validateMascot(mergedData);

    return this.repository.update(id, {
      name: mergedData.name.trim(),
      characterName: mergedData.characterName.trim(),
      theme: mergedData.theme ? mergedData.theme.trim() : null,
      description: mergedData.description ? mergedData.description.trim() : "",
      price: Number(mergedData.price),
      durationMinutes: mergedData.durationMinutes
        ? Number(mergedData.durationMinutes)
        : 60,
      minAge: mergedData.minAge ? Number(mergedData.minAge) : null,
      maxAge: mergedData.maxAge ? Number(mergedData.maxAge) : null,
      isAvailable:
        typeof mergedData.isAvailable === "boolean"
          ? mergedData.isAvailable
          : String(mergedData.isAvailable).toLowerCase() === "true",
      image: mergedData.image ? mergedData.image.trim() : "",
    });
  }

  delete(id) {
    const deleted = this.repository.delete(id);

    if (!deleted) {
      throw new Error("Mascot not found");
    }

    return true;
  }

  validateMascot(data) {
    if (!data.name || String(data.name).trim() === "") {
      throw new Error("Name is required");
    }

    if (!data.characterName || String(data.characterName).trim() === "") {
      throw new Error("Character name is required");
    }

    if (Number(data.price) <= 0 || Number.isNaN(Number(data.price))) {
      throw new Error("Price must be greater than 0");
    }
  }
}

const filePath = path.join(__dirname, "../data/storage/mascots.csv");
const repository = new FileMascotRepository(filePath);

module.exports = new MascotService(repository);