class Activity {
  constructor({
    id = null,
    name,
    description = '',
    price = 0,
    durationMinutes = 30,
    isActive = true,
    createdAt = null
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.durationMinutes = durationMinutes;
    this.isActive = isActive;
    this.createdAt = createdAt;
  }
}

module.exports = Activity;
