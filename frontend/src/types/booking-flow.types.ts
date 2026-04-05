export type BookingCategoryKey = 'mascots' | 'decorations' | 'bounce-bubble';

export type BookingFlowStepKey =
  | 'category'
  | 'package'
  | 'customization'
  | 'details'
  | 'review';

export interface BookingCategoryOption {
  key: BookingCategoryKey;
  title: string;
  description: string;
}

export interface BookingFlowStep {
  key: BookingFlowStepKey;
  title: string;
}

export interface BookingCustomizationSection {
  key: string;
  title: string;
  type: 'single-select' | 'multi-select';
  description: string;
}

export interface BookingCustomizationConfig {
  stepTitle: string;
  sections: BookingCustomizationSection[];
}

export interface BookingFlowConfiguration {
  categories: BookingCategoryOption[];
  selectedCategory?: BookingCategoryKey;
  steps: string[];
  packages?: unknown[];
  customization?: BookingCustomizationConfig;
}

export interface BookingCustomizationSelections {
  mascots: number[];
  activities: number[];
  extras: number[];
  theme?: string | null;
  backdrop?: string | null;
  bounceUnit?: string | null;
  bubbleExperience?: string | null;
}