const bookingFlowService = require('../../services/bookingFlowService');

class BookingFlowController {
  async getCategories(req, res, next) {
    try {
      const categories = bookingFlowService.getCategories();

      return res.status(200).json({
        success: true,
        message: 'Booking categories fetched successfully.',
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPackagesByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const packages = await bookingFlowService.getPackagesByCategory(category);

      return res.status(200).json({
        success: true,
        message: 'Booking packages fetched successfully.',
        data: packages,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomizationConfig(req, res, next) {
    try {
      const { category } = req.params;
      const config = bookingFlowService.getCustomizationConfig(category);

      return res.status(200).json({
        success: true,
        message: 'Booking customization configuration fetched successfully.',
        data: config,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFlowConfiguration(req, res, next) {
    try {
      const category = req.query.category || null;
      const flowConfiguration =
        await bookingFlowService.getFlowConfiguration(category);

      return res.status(200).json({
        success: true,
        message: 'Booking flow configuration fetched successfully.',
        data: flowConfiguration,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingFlowController();