const createHttpError = require('../../utils/createHttpError');

function roleMiddleware(requiredRoles) {
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  return (req, res, next) => {
    try {
      if (!req.user) {
        throw createHttpError('Unauthorized access.', 401);
      }

      if (!req.user.role) {
        throw createHttpError('User role is missing from token.', 403);
      }

      if (!roles.includes(req.user.role)) {
        throw createHttpError('You do not have permission to access this resource.', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = roleMiddleware;