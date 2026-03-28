const FileRepository = require("./FileRepository");
const Mascot = require("../../models/Mascot");

class FileMascotRepository extends FileRepository {
  constructor(filePath) {
    super(filePath);
  }

  getAll() {
    return super.getAll().map((item) => this.mapToMascot(item));
  }

  getById(id) {
    const item = super.getById(id);
    return item ? this.mapToMascot(item) : null;
  }

  add(entity) {
    const mascot = entity instanceof Mascot ? entity : new Mascot(entity);
    return super.add(this.mapToPlainObject(mascot));
  }

  update(id, updatedData) {
    const index = this.items.findIndex((item) => String(item.id) === String(id));

    if (index === -1) {
      return null;
    }

    const updatedMascot = {
      ...this.items[index],
      ...updatedData,
      id: this.items[index].id,
    };

    this.items[index] = updatedMascot;
    this.save();

    return this.mapToMascot(updatedMascot);
  }

  delete(id) {
    const index = this.items.findIndex((item) => String(item.id) === String(id));

    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);
    this.save();

    return true;
  }

  mapToMascot(item) {
    return new Mascot({
      id: Number(item.id),
      name: item.name,
      characterName: item.characterName,
      theme: item.theme || null,
      description: item.description || "",
      price: Number(item.price),
      durationMinutes: Number(item.durationMinutes),
      minAge: item.minAge ? Number(item.minAge) : null,
      maxAge: item.maxAge ? Number(item.maxAge) : null,
      isAvailable: String(item.isAvailable).toLowerCase() === "true",
      image: item.image || "",
    });
  }

  mapToPlainObject(mascot) {
    return {
      id: mascot.id,
      name: mascot.name,
      characterName: mascot.characterName,
      theme: mascot.theme,
      description: mascot.description,
      price: mascot.price,
      durationMinutes: mascot.durationMinutes,
      minAge: mascot.minAge,
      maxAge: mascot.maxAge,
      isAvailable: mascot.isAvailable,
      image: mascot.image || "",
    };
  }
}

module.exports = FileMascotRepository;