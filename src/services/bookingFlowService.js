const packageRepository = require('../data/repositories/packageRepository');
const { BOOKING_CATEGORIES, BOOKING_CATEGORY_VALUES } = require('../models/BookingCategory');

class BookingFlowService {
  getCategories() {
    return [
      {
        key: BOOKING_CATEGORIES.MASCOTS,
        title: 'Mascots',
        description: 'Choose mascot-focused party packages and character add-ons.',
      },
      {
        key: BOOKING_CATEGORIES.DECORATIONS,
        title: 'Decorations',
        description: 'Choose styling, backdrops, balloon setups, and themed decor packages.',
      },
      {
        key: BOOKING_CATEGORIES.BOUNCE_BUBBLE,
        title: 'Bounce & Bubble',
        description: 'Choose inflatable fun, bubble experiences, and energetic party options.',
      },
    ];
  }

  validateCategory(category) {
    if (!BOOKING_CATEGORY_VALUES.includes(category)) {
      throw new Error(
        `Invalid booking category. Allowed values: ${BOOKING_CATEGORY_VALUES.join(', ')}`
      );
    }
  }

  async getPackagesByCategory(category) {
    this.validateCategory(category);

    return packageRepository.getAll({
      category,
      isActive: true,
    });
  }

  getCustomizationConfig(category) {
    this.validateCategory(category);

    const configs = {
      [BOOKING_CATEGORIES.MASCOTS]: {
        stepTitle: 'Customize Your Mascot Experience',
        sections: [
          {
            key: 'mascots',
            title: 'Mascot Selection',
            type: 'multi-select',
            description: 'Select one or more mascot characters for the event.',
          },
          {
            key: 'extras',
            title: 'Mascot Add-ons',
            type: 'multi-select',
            description: 'Optional enhancements for mascot-based celebrations.',
          },
        ],
      },
      [BOOKING_CATEGORIES.DECORATIONS]: {
        stepTitle: 'Customize Your Decoration Package',
        sections: [
          {
            key: 'theme',
            title: 'Theme Style',
            type: 'single-select',
            description: 'Choose the overall decoration style or event mood.',
          },
          {
            key: 'backdrop',
            title: 'Backdrop & Visual Setup',
            type: 'single-select',
            description: 'Choose backdrop, table styling, and visual display options.',
          },
          {
            key: 'extras',
            title: 'Decoration Extras',
            type: 'multi-select',
            description: 'Choose additional decor items and enhancements.',
          },
        ],
      },
      [BOOKING_CATEGORIES.BOUNCE_BUBBLE]: {
        stepTitle: 'Customize Your Bounce & Bubble Experience',
        sections: [
          {
            key: 'bounceUnit',
            title: 'Bounce Unit',
            type: 'single-select',
            description: 'Choose the bounce attraction or inflatable type.',
          },
          {
            key: 'bubbleExperience',
            title: 'Bubble Experience',
            type: 'single-select',
            description: 'Choose the bubble machine or bubble show experience.',
          },
          {
            key: 'extras',
            title: 'Event Add-ons',
            type: 'multi-select',
            description: 'Choose any supporting extras for the event.',
          },
        ],
      },
    };

    return configs[category];
  }

  async getFlowConfiguration(category = null) {
    const categories = this.getCategories();

    if (!category) {
      return {
        categories,
        steps: ['Category', 'Package', 'Customization', 'Details', 'Review'],
      };
    }

    this.validateCategory(category);

    const packages = await this.getPackagesByCategory(category);
    const customization = this.getCustomizationConfig(category);

    return {
      categories,
      selectedCategory: category,
      steps: ['Category', 'Package', 'Customization', 'Details', 'Review'],
      packages,
      customization,
    };
  }
}

module.exports = new BookingFlowService();