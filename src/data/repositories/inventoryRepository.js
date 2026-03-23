const pool = require('../db/db');

class InventoryRepository {
  async getById(id, client = pool) {
    const result = await client.query(
      'SELECT * FROM inventory_items WHERE id = $1 LIMIT 1',
      [id]
    );
    return result.rows[0] || null;
  }

  async reduceAvailableQuantity(id, quantity, client = pool) {
    const query = `
      UPDATE inventory_items
      SET available_quantity = available_quantity - $1
      WHERE id = $2 AND available_quantity >= $1
      RETURNING *;
    `;
    const result = await client.query(query, [quantity, id]);
    return result.rows[0] || null;
  }
}

module.exports = new InventoryRepository();
