class Mascot {
  constructor({
    id = null,
    name,
    characterName,
    theme = null,
    description = '',
    price = 0,
    durationMinutes = 60,
    minAge = null,
    maxAge = null,
    isAvailable = true,
    createdAt = null,
    updatedAt = null
  }) {
    this.id = id;
    this.name = name;
    this.characterName = characterName;
    this.theme = theme;
    this.description = description;
    this.price = price;
    this.durationMinutes = durationMinutes;
    this.minAge = minAge;
    this.maxAge = maxAge;
    this.isAvailable = isAvailable;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Mascot;
