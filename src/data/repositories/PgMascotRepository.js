const pool = require('../config/db');

class PgMascotRepository {
  async getAllPublic() {
    const query = `
      SELECT *
      FROM mascots
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async getAllAdmin() {
    const query = `
      SELECT *
      FROM mascots
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async getById(id) {
    const query = `
      SELECT *
      FROM mascots
      WHERE id = $1
      LIMIT 1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async create(data) {
    const query = `
      INSERT INTO mascots (
        name,
        character_name,
        theme,
        description,
        price,
        duration_minutes,
        min_age,
        max_age,
        is_available
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `;

    const values = [
      data.name,
      data.character_name,
      data.theme,
      data.description,
      data.price,
      data.duration_minutes,
      data.min_age,
      data.max_age,
      data.is_available,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async update(id, data) {
    const query = `
      UPDATE mascots
      SET
        name = $1,
        character_name = $2,
        theme = $3,
        description = $4,
        price = $5,
        duration_minutes = $6,
        min_age = $7,
        max_age = $8,
        is_available = $9,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING *
    `;

    const values = [
      data.name,
      data.character_name,
      data.theme,
      data.description,
      data.price,
      data.duration_minutes,
      data.min_age,
      data.max_age,
      data.is_available,
      id,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  }

  async delete(id) {
    const query = `
      DELETE FROM mascots
      WHERE id = $1
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }
}

module.exports = new PgMascotRepository();