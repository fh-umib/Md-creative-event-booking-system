export type BookingStep = 1 | 2 | 3 | 4;

export type BookingAddOnCategory = 'decorations' | 'activities' | 'photoBooth';

export interface BookingAddOn {
  id: string;
  title: string;
  description: string;
  price: number;
  category: BookingAddOnCategory;
  imageUrl: string;
}

export interface BookingDetailsForm {
  fullName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventTime: string;
  location: string;
  childName: string;
  childAge: string;
  notes: string;
}

export interface BookingSelectionState {
  packageId: string;
  mascotIds: string[];
  addOnIds: string[];
  details: BookingDetailsForm;
}

export interface BookingSummary {
  packagePrice: number;
  mascotsPrice: number;
  addOnsPrice: number;
  total: number;
}