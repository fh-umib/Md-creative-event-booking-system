const bcrypt = require('bcrypt');
const path = require('path');
const generateToken = require('../utils/generateToken');
const FileStaffRepository = require('../data/repositories/FileStaffRepository');

const userRepository = new FileStaffRepository(
  path.join(__dirname, '../data/storage/staff.json')
);

class AuthService {
  async register(data) {
    const existingUser = userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = userRepository.create({
      fullName: data.fullName,
      email: data.email,
      passwordHash,
      phone: data.phone || null,
      role: data.role || 'Admin',
      isActive: true,
    });

    return {
      user,
      token: generateToken(user),
    };
  }

  async login(data) {
    const user = userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(data.password, user.passwordHash);

    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    return {
      user,
      token: generateToken(user),
    };
  }
}

module.exports = new AuthService();