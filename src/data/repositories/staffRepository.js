const pool = require('../config/db');

class StaffRepository {
  async getPublicStaff() {
    const query = `
      SELECT *
      FROM staff
      WHERE is_active = TRUE
      ORDER BY display_order ASC, id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  async getAll() {
    const query = `
      SELECT *
      FROM staff
      ORDER BY display_order ASC, id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = `
      SELECT *
      FROM staff
      WHERE id = $1
      LIMIT 1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(data) {
    const query = `
      INSERT INTO staff (
        full_name,
        role,
        bio,
        image_url,
        email,
        phone,
        is_active,
        display_order
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      data.full_name,
      data.role,
      data.bio || null,
      data.image_url || null,
      data.email || null,
      data.phone || null,
      data.is_active ?? true,
      data.display_order ?? 0,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id, data) {
    const query = `
      UPDATE staff
      SET
        full_name = $1,
        role = $2,
        bio = $3,
        image_url = $4,
        email = $5,
        phone = $6,
        is_active = $7,
        display_order = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `;

    const values = [
      data.full_name,
      data.role,
      data.bio || null,
      data.image_url || null,
      data.email || null,
      data.phone || null,
      data.is_active ?? true,
      data.display_order ?? 0,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id) {
    const query = `
      DELETE FROM staff
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async getStats() {
    const totalMembersQuery = `
      SELECT COUNT(*)::int AS total_members
      FROM staff
      WHERE is_active = TRUE
    `;

    const reviewsQuery = `
      SELECT
        COALESCE(AVG(rating), 0)::numeric(10,1) AS avg_rating,
        COUNT(*)::int AS total_reviews
      FROM staff_reviews
      WHERE is_approved = TRUE
    `;

    const [membersResult, reviewsResult] = await Promise.all([
      pool.query(totalMembersQuery),
      pool.query(reviewsQuery),
    ]);

    return {
      total_members: membersResult.rows[0].total_members,
      avg_rating: Number(reviewsResult.rows[0].avg_rating || 0),
      total_reviews: reviewsResult.rows[0].total_reviews,
    };
  }

  async getApprovedReviews() {
    const query = `
      SELECT
        sr.id,
        sr.staff_id,
        sr.customer_name,
        sr.rating,
        sr.comment,
        sr.created_at,
        s.full_name AS staff_name,
        s.role AS staff_role
      FROM staff_reviews sr
      JOIN staff s ON s.id = sr.staff_id
      WHERE sr.is_approved = TRUE
      ORDER BY sr.created_at DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = new StaffRepository();
