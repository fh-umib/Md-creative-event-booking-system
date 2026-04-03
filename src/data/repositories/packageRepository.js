const pool = require('../config/db');

class PackageRepository {
  async getAll(filters = {}) {
    const values = [];
    const conditions = [];
    let index = 1;

    if (filters.isActive !== undefined) {
      conditions.push(`is_active = $${index++}`);
      values.push(filters.isActive);
    }

    if (filters.category) {
      conditions.push(`LOWER(category) = LOWER($${index++})`);
      values.push(filters.category);
    }

    if (filters.search) {
      conditions.push(`(
        LOWER(title) LIKE LOWER($${index})
        OR LOWER(COALESCE(description, '')) LIKE LOWER($${index})
      )`);
      values.push(`%${filters.search}%`);
      index++;
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT
        id,
        title,
        description,
        category,
        duration_minutes,
        min_mascots,
        max_mascots,
        base_price,
        is_active,
        created_at,
        updated_at
      FROM packages
      ${whereClause}
      ORDER BY id DESC
    `;

    const { rows } = await pool.query(query, values);
    return rows;
  }

  async getById(id) {
    const query = `
      SELECT
        id,
        title,
        description,
        category,
        duration_minutes,
        min_mascots,
        max_mascots,
        base_price,
        is_active,
        created_at,
        updated_at
      FROM packages
      WHERE id = $1
      LIMIT 1
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async create(data) {
    const query = `
      INSERT INTO packages (
        title,
        description,
        category,
        duration_minutes,
        min_mascots,
        max_mascots,
        base_price,
        is_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, TRUE))
      RETURNING
        id,
        title,
        description,
        category,
        duration_minutes,
        min_mascots,
        max_mascots,
        base_price,
        is_active,
        created_at,
        updated_at
    `;

    const values = [
      data.title,
      data.description ?? null,
      data.category ?? null,
      data.durationMinutes ?? 60,
      data.minMascots ?? 0,
      data.maxMascots ?? 5,
      data.basePrice ?? 0,
      data.isActive ?? true,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async update(id, data) {
    const query = `
      UPDATE packages
      SET
        title = $1,
        description = $2,
        category = $3,
        duration_minutes = $4,
        min_mascots = $5,
        max_mascots = $6,
        base_price = $7,
        is_active = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING
        id,
        title,
        description,
        category,
        duration_minutes,
        min_mascots,
        max_mascots,
        base_price,
        is_active,
        created_at,
        updated_at
    `;

    const values = [
      data.title,
      data.description ?? null,
      data.category ?? null,
      data.durationMinutes ?? 60,
      data.minMascots ?? 0,
      data.maxMascots ?? 5,
      data.basePrice ?? 0,
      data.isActive ?? true,
      id,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  }

  async softDelete(id) {
    const query = `
      UPDATE packages
      SET
        is_active = FALSE,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id
    `;

    const { rows } = await pool.query(query, [id]);
    return Boolean(rows[0]);
  }
}

module.exports = new PackageRepository();