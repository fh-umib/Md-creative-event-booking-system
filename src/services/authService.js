const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const generateToken = require('../utils/generateToken');

class AuthService {
  async register(data) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      fullName: data.fullName,
      email: data.email,
      passwordHash,
      phone: data.phone || null,
      role: data.role || 'Client',
      isActive: true
    });

    return {
      user,
      token: generateToken(user)
    };
  }

  async login(data) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(data.password, user.password_hash);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    return {
      user,
      token: generateToken(user)
    };
  }
}

module.exports = new AuthService();
