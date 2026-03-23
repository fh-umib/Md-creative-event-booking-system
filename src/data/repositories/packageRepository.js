const pool = require('../db/db');

class PackageRepository {
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM packages WHERE is_active = TRUE ORDER BY id DESC'
    );
    return result.rows;
  }

  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM packages WHERE id = $1 LIMIT 1',
      [id]
    );
    return result.rows[0] || null;
  }

  async create(pkg) {
    const query = `
      INSERT INTO packages (
        title, description, category, duration_minutes,
        min_mascots, max_mascots, base_price, is_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [
      pkg.title,
      pkg.description,
      pkg.category,
      pkg.durationMinutes,
      pkg.minMascots,
      pkg.maxMascots,
      pkg.basePrice,
      pkg.isActive
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new PackageRepository();
