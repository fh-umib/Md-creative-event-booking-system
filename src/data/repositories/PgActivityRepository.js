const pool = require('../config/db');

class PgActivityRepository {
  async getAllPublic() {
    const query = `
      SELECT *
      FROM activities
      ORDER BY created_at DESC
    `;

    const { rows } = await pool.query(query);
    return rows;
  }

  async getAllAdmin() {
    const query = `
      SELECT *
      FROM activities
      ORDER BY created_at DESC
    `;

    const { rows } = await pool.query(query);
    return rows;
  }

  async getById(id) {
    const query = `
      SELECT *
      FROM activities
      WHERE id = $1
      LIMIT 1
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async create(data) {
    const query = `
      INSERT INTO activities (
        name,
        description,
        price,
        duration_minutes,
        is_active
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      data.name,
      data.description,
      data.price,
      data.duration_minutes,
      data.is_active,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async update(id, data) {
    const query = `
      UPDATE activities
      SET
        name = $1,
        description = $2,
        price = $3,
        duration_minutes = $4,
        is_active = $5,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;

    const values = [
      data.name,
      data.description,
      data.price,
      data.duration_minutes,
      data.is_active,
      id,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  }

  async delete(id) {
    const query = `
      DELETE FROM activities
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }
}

module.exports = new PgActivityRepository();