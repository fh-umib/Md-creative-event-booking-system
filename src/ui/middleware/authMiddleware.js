const jwt = require('jsonwebtoken');
const createHttpError = require('../../utils/createHttpError');

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw createHttpError('Authorization header is required.', 401);
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw createHttpError('Authorization header must use Bearer token.', 401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw createHttpError('Authentication token is missing.', 401);
    }

    if (!process.env.JWT_SECRET) {
      throw createHttpError('JWT configuration is missing on the server.', 500);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.email || !decoded.role) {
      throw createHttpError('Invalid authentication token payload.', 401);
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 401;
      error.message = 'Invalid or expired token.';
    }

    next(error);
  }
}

module.exports = authMiddleware;