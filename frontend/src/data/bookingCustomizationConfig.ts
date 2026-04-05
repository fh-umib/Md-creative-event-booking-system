import type { BookingCustomizationConfig, BookingCategoryKey } from '../types';

export const bookingCustomizationConfig: Record<
  BookingCategoryKey,
  BookingCustomizationConfig
> = {
  mascots: {
    stepTitle: 'Customize Your Mascot Experience',
    sections: [
      {
        key: 'mascots',
        title: 'Mascot Selection',
        type: 'multi-select',
        description: 'Choose one or more mascots for the event.',
      },
      {
        key: 'extras',
        title: 'Mascot Add-ons',
        type: 'multi-select',
        description: 'Optional add-ons for mascot-based events.',
      },
    ],
  },
  decorations: {
    stepTitle: 'Customize Your Decoration Package',
    sections: [
      {
        key: 'theme',
        title: 'Theme Style',
        type: 'single-select',
        description: 'Choose the overall look and event style.',
      },
      {
        key: 'backdrop',
        title: 'Backdrop Setup',
        type: 'single-select',
        description: 'Choose backdrop and display options.',
      },
      {
        key: 'extras',
        title: 'Decoration Extras',
        type: 'multi-select',
        description: 'Choose additional decorative enhancements.',
      },
    ],
  },
  'bounce-bubble': {
    stepTitle: 'Customize Your Bounce & Bubble Experience',
    sections: [
      {
        key: 'bounceUnit',
        title: 'Bounce Unit',
        type: 'single-select',
        description: 'Choose the bounce attraction type.',
      },
      {
        key: 'bubbleExperience',
        title: 'Bubble Experience',
        type: 'single-select',
        description: 'Choose bubble effects or related entertainment.',
      },
      {
        key: 'extras',
        title: 'Event Extras',
        type: 'multi-select',
        description: 'Choose supporting event add-ons.',
      },
    ],
  },
};