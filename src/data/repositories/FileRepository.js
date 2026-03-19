const fs = require("fs");
const path = require("path");
const IRepository = require("./IRepository");

class FileRepository extends IRepository {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.items = this.load();
  }

  load() {
    if (!fs.existsSync(this.filePath)) return [];

    const content = fs.readFileSync(this.filePath, "utf-8").trim();
    if (!content) return [];

    const lines = content.split("\n");
    const dataLines = lines.slice(1);

    return dataLines.map((line) => {
      const [id, userId, packageId, eventDate, status] = line.split(",");
      return {
        id: Number(id),
        userId: Number(userId),
        packageId: Number(packageId),
        eventDate,
        status,
      };
    });
  }

  getAll() {
    return this.items;
  }

  getById(id) {
    return this.items.find((item) => item.id === Number(id));
  }

  add(item) {
    this.items.push(item);
  }

  save() {
    const header = "id,userId,packageId,eventDate,status";
    const rows = this.items.map(
      (item) =>
        `${item.id},${item.userId},${item.packageId},${item.eventDate},${item.status}`
    );

    fs.writeFileSync(this.filePath, [header, ...rows].join("\n"), "utf-8");
  }
}

module.exports = FileRepository;