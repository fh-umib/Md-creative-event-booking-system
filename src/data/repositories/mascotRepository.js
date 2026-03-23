const pool = require('../db/db');

class MascotRepository {
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM mascots WHERE is_available = TRUE ORDER BY id DESC'
    );
    return result.rows;
  }

  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM mascots WHERE id = $1 LIMIT 1',
      [id]
    );
    return result.rows[0] || null;
  }

  async create(mascot) {
    const query = `
      INSERT INTO mascots (
        name, character_name, theme, description, price,
        duration_minutes, min_age, max_age, is_available
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      mascot.name,
      mascot.characterName,
      mascot.theme,
      mascot.description,
      mascot.price,
      mascot.durationMinutes,
      mascot.minAge,
      mascot.maxAge,
      mascot.isAvailable
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new MascotRepository();
