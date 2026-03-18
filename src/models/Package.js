class Package {
  constructor({
    id = null,
    title,
    description = '',
    category = null,
    durationMinutes = 60,
    minMascots = 0,
    maxMascots = 5,
    basePrice = 0,
    isActive = true,
    mascots = [],
    activities = [],
    extras = [],
    createdAt = null,
    updatedAt = null
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.durationMinutes = durationMinutes;
    this.minMascots = minMascots;
    this.maxMascots = maxMascots;
    this.basePrice = basePrice;
    this.isActive = isActive;
    this.mascots = mascots;
    this.activities = activities;
    this.extras = extras;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Package;
