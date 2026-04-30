const pool = require('../config/db');

class PgPackageRepository {
  async getAllAdmin(search = '') {
    const query = `
      SELECT
        p.*,
        COALESCE(
          json_agg(DISTINCT e.name) FILTER (WHERE e.id IS NOT NULL),
          '[]'
        ) AS extras
      FROM packages p
      LEFT JOIN package_extras pe ON pe.package_id = p.id
      LEFT JOIN extras e ON e.id = pe.extra_id
      WHERE (
        $1 = ''
        OR LOWER(p.title) LIKE LOWER($2)
        OR LOWER(COALESCE(p.description, '')) LIKE LOWER($2)
        OR LOWER(COALESCE(p.category, '')) LIKE LOWER($2)
      )
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;

    const values = [search, `%${search}%`];
    const { rows } = await pool.query(query, values);
    return rows;
  }

  async getAllPublic() {
    const query = `
      SELECT
        p.*,
        COALESCE(
          json_agg(DISTINCT e.name) FILTER (WHERE e.id IS NOT NULL),
          '[]'
        ) AS extras
      FROM packages p
      LEFT JOIN package_extras pe ON pe.package_id = p.id
      LEFT JOIN extras e ON e.id = pe.extra_id
      WHERE p.is_active = TRUE
      GROUP BY p.id
      ORDER BY p.base_price ASC, p.id ASC
    `;

    const { rows } = await pool.query(query);
    return rows;
  }

  async getPublicCategories() {
    const query = `
      SELECT
        category,
        COUNT(*)::int AS total_packages,
        MIN(base_price) AS min_price,
        MAX(base_price) AS max_price
      FROM packages
      WHERE is_active = TRUE
      GROUP BY category
      ORDER BY category ASC
    `;

    const { rows } = await pool.query(query);
    return rows;
  }

  async getByCategory(category) {
    const query = `
      SELECT
        p.*,
        COALESCE(
          json_agg(DISTINCT e.name) FILTER (WHERE e.id IS NOT NULL),
          '[]'
        ) AS extras
      FROM packages p
      LEFT JOIN package_extras pe ON pe.package_id = p.id
      LEFT JOIN extras e ON e.id = pe.extra_id
      WHERE p.category = $1
        AND p.is_active = TRUE
      GROUP BY p.id
      ORDER BY p.base_price ASC, p.id ASC
    `;

    const { rows } = await pool.query(query, [category]);
    return rows;
  }

  async getById(id) {
    const query = `
      SELECT
        p.*,
        COALESCE(
          json_agg(DISTINCT e.name) FILTER (WHERE e.id IS NOT NULL),
          '[]'
        ) AS extras
      FROM packages p
      LEFT JOIN package_extras pe ON pe.package_id = p.id
      LEFT JOIN extras e ON e.id = pe.extra_id
      WHERE p.id = $1
      GROUP BY p.id
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
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
    `;

    const values = [
      data.title,
      data.description,
      data.category,
      data.duration_minutes,
      data.min_mascots,
      data.max_mascots,
      data.base_price,
      data.is_active,
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
      RETURNING *
    `;

    const values = [
      data.title,
      data.description,
      data.category,
      data.duration_minutes,
      data.min_mascots,
      data.max_mascots,
      data.base_price,
      data.is_active,
      id,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  }

  async delete(id) {
    const query = `
      DELETE FROM packages
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }
}

module.exports = new PgPackageRepository();