const bcrypt = require('bcrypt');
const path = require('path');
const generateToken = require('../utils/generateToken');
const createHttpError = require('../utils/createHttpError');
const FileStaffRepository = require('../data/repositories/FileStaffRepository');

const userRepository = new FileStaffRepository(
  path.join(__dirname, '../data/storage/staff.json')
);

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || null,
    role: user.role,
    isActive: user.isActive,
  };
}

class AuthService {
  async register(data) {
    const fullName = data?.fullName ? String(data.fullName).trim() : '';
    const email = data?.email ? String(data.email).trim().toLowerCase() : '';
    const password = data?.password ? String(data.password) : '';
    const phone = data?.phone ? String(data.phone).trim() : null;
    const requestedRole = data?.role ? String(data.role).trim() : 'Admin';

    if (!fullName) {
      throw createHttpError('Full name is required.', 400);
    }

    if (!email) {
      throw createHttpError('Email is required.', 400);
    }

    if (!isValidEmail(email)) {
      throw createHttpError('A valid email address is required.', 400);
    }

    if (!password) {
      throw createHttpError('Password is required.', 400);
    }

    if (password.length < 8) {
      throw createHttpError('Password must be at least 8 characters long.', 400);
    }

    const allowedRoles = ['Admin', 'Staff'];

    if (!allowedRoles.includes(requestedRole)) {
      throw createHttpError(
        `Invalid role. Allowed roles: ${allowedRoles.join(', ')}`,
        400
      );
    }

    const existingUser = userRepository.findByEmail(email);

    if (existingUser) {
      throw createHttpError('Email already exists.', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      fullName,
      email,
      passwordHash,
      phone,
      role: requestedRole,
      isActive: true,
    });

    const safeUser = sanitizeUser(user);

    return {
      user: safeUser,
      token: generateToken(safeUser),
    };
  }

  async login(data) {
    const email = data?.email ? String(data.email).trim().toLowerCase() : '';
    const password = data?.password ? String(data.password) : '';

    if (!email) {
      throw createHttpError('Email is required.', 400);
    }

    if (!isValidEmail(email)) {
      throw createHttpError('A valid email address is required.', 400);
    }

    if (!password) {
      throw createHttpError('Password is required.', 400);
    }

    const user = userRepository.findByEmail(email);

    if (!user) {
      throw createHttpError('Invalid credentials.', 401);
    }

    if (!user.isActive) {
      throw createHttpError('This account is inactive.', 403);
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      throw createHttpError('Invalid credentials.', 401);
    }

    const safeUser = sanitizeUser(user);

    return {
      user: safeUser,
      token: generateToken(safeUser),
    };
  }
}

module.exports = new AuthService();