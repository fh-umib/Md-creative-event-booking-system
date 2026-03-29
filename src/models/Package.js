class Package {
  constructor({
    id,
    name,
    description,
    price,
    imageUrl = '',
    isActive = true,
  }) {
    this.id = Number(id);
    this.name = name;
    this.description = description || '';
    this.price = Number(price);
    this.imageUrl = imageUrl || '';
    this.isActive = Boolean(isActive);
  }
}

module.exports = Package;