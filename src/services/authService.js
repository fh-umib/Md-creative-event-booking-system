const bcrypt = require('bcrypt');
const crypto = require('crypto');
const generateToken = require('../utils/generateToken');
const createHttpError = require('../utils/createHttpError');
const userModel = require('../models/userModel');
const { sendVerificationEmail, sendResetPasswordEmail } = require('./emailService');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  return (
    typeof password === 'string' &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

function sanitizeUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    fullName: user.full_name || user.fullName,
    email: user.email,
    phone: user.phone || null,
    role: user.role,
    isActive: user.is_active ?? user.isActive,
    isVerified: user.is_verified ?? user.isVerified,
  };
}

class AuthService {
  async register(data) {
    const fullName = data?.fullName ? String(data.fullName).trim() : '';
    const email = data?.email ? String(data.email).trim().toLowerCase() : '';
    const password = data?.password ? String(data.password) : '';
    const phone = data?.phone ? String(data.phone).trim() : null;
    const requestedRole = data?.role ? String(data.role).trim() : 'Staff';

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

    if (!isStrongPassword(password)) {
      throw createHttpError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
        400
      );
    }

    const allowedRoles = ['Admin', 'Staff'];

    if (!allowedRoles.includes(requestedRole)) {
      throw createHttpError(
        `Invalid role. Allowed roles: ${allowedRoles.join(', ')}`,
        400
      );
    }

    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      throw createHttpError('Email already exists.', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userModel.createUser({
      fullName,
      email,
      passwordHash,
      phone,
      role: requestedRole,
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    });

    const safeUser = sanitizeUser(user);

    return {
      user: safeUser,
      token: generateToken(safeUser),
    };
  }

  async registerClient(data) {
    const fullName = data?.fullName ? String(data.fullName).trim() : '';
    const email = data?.email ? String(data.email).trim().toLowerCase() : '';
    const password = data?.password ? String(data.password) : '';
    const phone = data?.phone ? String(data.phone).trim() : null;

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

    if (!isStrongPassword(password)) {
      throw createHttpError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
        400
      );
    }

    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      throw createHttpError('Email already exists.', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await userModel.createUser({
      fullName,
      email,
      passwordHash,
      phone,
      role: 'Client',
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    await sendVerificationEmail({
      to: email,
      fullName,
      verificationToken,
    });

    return {
      user: sanitizeUser(user),
    };
  }

  async verifyEmail(token) {
    const verificationToken = token ? String(token).trim() : '';

    if (!verificationToken) {
      throw createHttpError('Verification token is required.', 400);
    }

    const user = await userModel.findByVerificationToken(verificationToken);

    if (!user) {
      throw createHttpError(
        'This verification link is invalid or has already been used.',
        400
      );
    }

    if (
      user.verification_token_expires &&
      new Date(user.verification_token_expires).getTime() < Date.now()
    ) {
      throw createHttpError('Verification token has expired.', 400);
    }

    const verifiedUser = await userModel.verifyUserById(user.id);

    return {
      message: 'Email verified successfully.',
      user: sanitizeUser(verifiedUser),
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

    const user = await userModel.findByEmail(email);

    if (!user) {
      throw createHttpError('Invalid credentials.', 401);
    }

    if (!user.is_active) {
      throw createHttpError('This account is inactive.', 403);
    }

    if (!user.is_verified) {
      throw createHttpError(
        'Please verify your email before signing in.',
        403
      );
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      throw createHttpError('Invalid credentials.', 401);
    }

    const safeUser = sanitizeUser(user);

    return {
      user: safeUser,
      token: generateToken(safeUser),
    };
  }
  async forgotPassword(data) {
  const email = data?.email ? String(data.email).trim().toLowerCase() : '';

  if (!email) {
    throw createHttpError('Email is required.', 400);
  }

  if (!isValidEmail(email)) {
    throw createHttpError('A valid email address is required.', 400);
  }

  const user = await userModel.findByEmail(email);

  // Për siguri, edhe nëse emaili nuk ekziston, kthejmë të njëjtin mesazh.
  if (!user) {
    return {
      message:
        'If an account with that email exists, a password reset link has been sent.',
    };
  }

  

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

  await userModel.setResetPasswordToken(user.id, resetToken, resetExpires);

  await sendResetPasswordEmail({
    to: user.email,
    fullName: user.full_name || user.fullName,
    resetToken,
  });

  return {
    message:
      'If an account with that email exists, a password reset link has been sent.',
  };
}
async resetPassword(data) {
  const token = data?.token ? String(data.token).trim() : '';
  const password = data?.password ? String(data.password) : '';

  if (!token) {
    throw createHttpError('Reset token is required.', 400);
  }

  if (!password) {
    throw createHttpError('New password is required.', 400);
  }

  if (!isStrongPassword(password)) {
    throw createHttpError(
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
      400
    );
  }

  const user = await userModel.findByResetPasswordToken(token);

  if (!user) {
    throw createHttpError(
      'This reset link is invalid or has already been used.',
      400
    );
  }

  if (
    user.reset_password_expires &&
    new Date(user.reset_password_expires).getTime() < Date.now()
  ) {
    await userModel.clearResetPasswordToken(user.id);
    throw createHttpError('This reset link has expired.', 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const updatedUser = await userModel.updatePasswordByUserId(
    user.id,
    passwordHash
  );

  return {
    message: 'Your password has been reset successfully.',
    user: sanitizeUser(updatedUser),
  };
}
}

module.exports = new AuthService();