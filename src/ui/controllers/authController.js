const authService = require('../../services/authService');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async registerClient(req, res, next) {
    try {
      const result = await authService.registerClient(req.body);

      return res.status(201).json({
        success: true,
        message: 'Client account created successfully. Please check your email to verify your account.',
        data: {
          user: result.user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const result = await authService.verifyEmail(req.query.token);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: {
          user: result.user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);

      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async forgotPassword(req, res, next) {
  try {
    const result = await authService.forgotPassword(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
}
async resetPassword(req, res, next) {
  try {
    const result = await authService.resetPassword(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
}
}

module.exports = new AuthController();