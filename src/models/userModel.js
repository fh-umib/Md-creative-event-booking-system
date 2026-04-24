const pool = require('../data/config/db');

async function findByEmail(email) {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
    LIMIT 1
  `;

  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
}

async function createUser({
  fullName,
  email,
  passwordHash,
  phone = null,
  role = 'Client',
  isVerified = false,
  verificationToken = null,
  verificationTokenExpires = null,
}) {
  const query = `
    INSERT INTO users (
      full_name,
      email,
      password_hash,
      phone,
      role,
      is_active,
      is_verified,
      verification_token,
      verification_token_expires
    )
    VALUES ($1, $2, $3, $4, $5, TRUE, $6, $7, $8)
    RETURNING
      id,
      full_name,
      email,
      phone,
      role,
      is_active,
      is_verified,
      verification_token,
      verification_token_expires,
      created_at,
      updated_at
  `;

  const values = [
    fullName,
    email,
    passwordHash,
    phone,
    role,
    isVerified,
    verificationToken,
    verificationTokenExpires,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function findByVerificationToken(token) {
  const query = `
    SELECT *
    FROM users
    WHERE verification_token = $1
    LIMIT 1
  `;

  const result = await pool.query(query, [token]);
  return result.rows[0] || null;
}

async function verifyUserById(userId) {
  const query = `
    UPDATE users
    SET
      is_verified = TRUE,
      verification_token = NULL,
      verification_token_expires = NULL,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING
      id,
      full_name,
      email,
      phone,
      role,
      is_active,
      is_verified,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [userId]);
  return result.rows[0] || null;
} 
async function setResetPasswordToken(userId, resetToken, resetExpires) {
  const query = `
    UPDATE users
    SET
      reset_password_token = $2,
      reset_password_expires = $3,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id, email, reset_password_token, reset_password_expires
  `;

  const result = await pool.query(query, [userId, resetToken, resetExpires]);
  return result.rows[0] || null;
}

async function findByResetPasswordToken(token) {
  const query = `
    SELECT *
    FROM users
    WHERE reset_password_token = $1
    LIMIT 1
  `;

  const result = await pool.query(query, [token]);
  return result.rows[0] || null;
}

async function updatePasswordByUserId(userId, passwordHash) {
  const query = `
    UPDATE users
    SET
      password_hash = $2,
      reset_password_token = NULL,
      reset_password_expires = NULL,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id, full_name, email, phone, role, is_active, is_verified
  `;

  const result = await pool.query(query, [userId, passwordHash]);
  return result.rows[0] || null;
}

async function clearResetPasswordToken(userId) {
  const query = `
    UPDATE users
    SET
      reset_password_token = NULL,
      reset_password_expires = NULL,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id
  `;

  const result = await pool.query(query, [userId]);
  return result.rows[0] || null;
}

module.exports = {
  findByEmail,
  createUser,
  findByVerificationToken,
  verifyUserById,
  setResetPasswordToken,
  findByResetPasswordToken,
  updatePasswordByUserId,
  clearResetPasswordToken,
};