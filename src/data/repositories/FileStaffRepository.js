const fs = require('fs');
const path = require('path');
const FileRepository = require('./FileRepository');

class FileStaffRepository extends FileRepository {
  constructor(filePath) {
    super(filePath);

    this.filePath = filePath;

    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }

    this.items = this.read();
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.items, null, 2));
  }

  getAll() {
    return this.items;
  }

  findById(id) {
    return this.items.find((item) => String(item.id) === String(id)) || null;
  }

  findByEmail(email) {
    return (
      this.items.find(
        (item) =>
          String(item.email).trim().toLowerCase() ===
          String(email).trim().toLowerCase()
      ) || null
    );
  }

  create(data) {
    const newUser = {
      id: this.items.length > 0
        ? Math.max(...this.items.map((item) => Number(item.id) || 0)) + 1
        : 1,
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.passwordHash,
      phone: data.phone || null,
      role: data.role || 'Admin',
      isActive: data.isActive !== undefined ? data.isActive : true,
      createdAt: new Date().toISOString(),
    };

    this.items.push(newUser);
    this.save();

    return newUser;
  }

  update(id, updatedData) {
    const index = this.items.findIndex((item) => String(item.id) === String(id));

    if (index === -1) {
      return null;
    }

    this.items[index] = {
      ...this.items[index],
      ...updatedData,
      id: this.items[index].id,
    };

    this.save();
    return this.items[index];
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
}

module.exports = FileStaffRepository;