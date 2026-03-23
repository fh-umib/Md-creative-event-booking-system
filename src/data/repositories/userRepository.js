const pool = require('../db/db');

class UserRepository {
  async create(user) {
    const query = `
      INSERT INTO users (full_name, email, password_hash, phone, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      user.fullName,
      user.email,
      user.passwordHash,
      user.phone,
      user.role,
      user.isActive
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    return result.rows[0] || null;
  }

  async findById(id) {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1 LIMIT 1',
      [id]
    );
    return result.rows[0] || null;
  }
}

module.exports = new UserRepository();
