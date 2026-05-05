export type ValidationResult = {
  valid: boolean;
  message?: string;
};

export function isRequired(value: unknown, fieldName = 'Field'): ValidationResult {
  if (value === null || value === undefined || String(value).trim() === '') {
    return {
      valid: false,
      message: `${fieldName} is required.`,
    };
  }

  return { valid: true };
}

export function isValidEmail(email: string): ValidationResult {
  const value = email.trim();

  if (!value) {
    return {
      valid: false,
      message: 'Email is required.',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    return {
      valid: false,
      message: 'Please enter a valid email address.',
    };
  }

  return { valid: true };
}

export function isValidPhone(phone: string): ValidationResult {
  const value = phone.trim();

  if (!value) {
    return {
      valid: false,
      message: 'Phone number is required.',
    };
  }

  const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

  if (!phoneRegex.test(value)) {
    return {
      valid: false,
      message: 'Please enter a valid phone number.',
    };
  }

  return { valid: true };
}

export function isPositiveNumber(value: number | string, fieldName = 'Value'): ValidationResult {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return {
      valid: false,
      message: `${fieldName} must be greater than 0.`,
    };
  }

  return { valid: true };
}

export function isValidDate(value: string, fieldName = 'Date'): ValidationResult {
  if (!value) {
    return {
      valid: false,
      message: `${fieldName} is required.`,
    };
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return {
      valid: false,
      message: `${fieldName} is invalid.`,
    };
  }

  return { valid: true };
}

export function validateMinLength(
  value: string,
  minLength: number,
  fieldName = 'Field',
): ValidationResult {
  if (value.trim().length < minLength) {
    return {
      valid: false,
      message: `${fieldName} must be at least ${minLength} characters long.`,
    };
  }

  return { valid: true };
}

export default {
  isRequired,
  isValidEmail,
  isValidPhone,
  isPositiveNumber,
  isValidDate,
  validateMinLength,
};