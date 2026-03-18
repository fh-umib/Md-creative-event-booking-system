class Extra {
  constructor({
    id = null,
    name,
    description = '',
    price = 0,
    unitLabel = 'item',
    isActive = true,
    createdAt = null
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.unitLabel = unitLabel;
    this.isActive = isActive;
    this.createdAt = createdAt;
  }
}

module.exports = Extra;
