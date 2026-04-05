import { useMemo, useState } from 'react';
import type {
  BookingCategoryKey,
  BookingCustomizationConfig,
  BookingCustomizationSelections,
  BookingDetailsForm,
  BookingFlowStepKey,
  Package,
} from '../types';

const stepOrder: BookingFlowStepKey[] = [
  'category',
  'package',
  'customization',
  'details',
  'review',
];

const initialDetails: BookingDetailsForm = {
  fullName: '',
  phone: '',
  email: '',
  eventTitle: '',
  eventDate: '',
  startTime: '',
  endTime: '',
  venueName: '',
  venueAddress: '',
  guestCount: 0,
  specialRequests: '',
};

const initialCustomization: BookingCustomizationSelections = {
  mascots: [],
  activities: [],
  extras: [],
  theme: null,
  backdrop: null,
  bounceUnit: null,
  bubbleExperience: null,
};

export function useBookingFlow() {
  const [currentStep, setCurrentStep] = useState<BookingFlowStepKey>('category');
  const [selectedCategory, setSelectedCategory] = useState<BookingCategoryKey | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [customizationConfig, setCustomizationConfig] =
    useState<BookingCustomizationConfig | null>(null);
  const [customization, setCustomization] =
    useState<BookingCustomizationSelections>(initialCustomization);
  const [details, setDetails] = useState<BookingDetailsForm>(initialDetails);

  const currentStepIndex = useMemo(
    () => stepOrder.findIndex((step) => step === currentStep),
    [currentStep]
  );

  const goToNextStep = () => {
    const nextIndex = Math.min(currentStepIndex + 1, stepOrder.length - 1);
    setCurrentStep(stepOrder[nextIndex]);
  };

  const goToPreviousStep = () => {
    const previousIndex = Math.max(currentStepIndex - 1, 0);
    setCurrentStep(stepOrder[previousIndex]);
  };

  const resetFlow = () => {
    setCurrentStep('category');
    setSelectedCategory(null);
    setSelectedPackage(null);
    setCustomizationConfig(null);
    setCustomization(initialCustomization);
    setDetails(initialDetails);
  };

  return {
    stepOrder,
    currentStep,
    currentStepIndex,
    selectedCategory,
    selectedPackage,
    customizationConfig,
    customization,
    details,

    setCurrentStep,
    setSelectedCategory,
    setSelectedPackage,
    setCustomizationConfig,
    setCustomization,
    setDetails,

    goToNextStep,
    goToPreviousStep,
    resetFlow,
  };
}