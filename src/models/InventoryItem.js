class InventoryItem {
  constructor({
    id = null,
    name,
    category = null,
    totalQuantity = 0,
    availableQuantity = 0,
    unitLabel = 'piece',
    conditionStatus = 'Good',
    notes = '',
    isActive = true,
    createdAt = null
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.totalQuantity = totalQuantity;
    this.availableQuantity = availableQuantity;
    this.unitLabel = unitLabel;
    this.conditionStatus = conditionStatus;
    this.notes = notes;
    this.isActive = isActive;
    this.createdAt = createdAt;
  }
}

module.exports = InventoryItem;
