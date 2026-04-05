const pool = require('../config/db');

class PgDecorationRepository {
  async getAll() {
    const query = `
      SELECT *
      FROM decorations
      WHERE is_active = TRUE
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async getAllAdmin() {
    const query = `
      SELECT *
      FROM decorations
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async getById(id) {
    const query = `
      SELECT *
      FROM decorations
      WHERE id = $1
      LIMIT 1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async getBySlug(slug) {
    const query = `
      SELECT *
      FROM decorations
      WHERE slug = $1 AND is_active = TRUE
      LIMIT 1
    `;
    const { rows } = await pool.query(query, [slug]);
    return rows[0] || null;
  }

  async create(data) {
    const query = `
      INSERT INTO decorations
      (title, slug, category, short_description, full_description, image_url, price_from, theme_colors, is_featured, is_active)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `;

    const values = [
      data.title,
      data.slug,
      data.category,
      data.short_description,
      data.full_description,
      data.image_url,
      data.price_from,
      data.theme_colors,
      data.is_featured,
      data.is_active,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async update(id, data) {
    const query = `
      UPDATE decorations
      SET
        title = $1,
        slug = $2,
        category = $3,
        short_description = $4,
        full_description = $5,
        image_url = $6,
        price_from = $7,
        theme_colors = $8,
        is_featured = $9,
        is_active = $10,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *
    `;

    const values = [
      data.title,
      data.slug,
      data.category,
      data.short_description,
      data.full_description,
      data.image_url,
      data.price_from,
      data.theme_colors,
      data.is_featured,
      data.is_active,
      id,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  }

  async delete(id) {
    const query = `
      DELETE FROM decorations
      WHERE id = $1
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }
}

module.exports = new PgDecorationRepository();