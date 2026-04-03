const { BOOKING_CATEGORY_VALUES } = require('../models/BookingCategory');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function isValidNumber(value) {
  return !Number.isNaN(Number(value));
}

function isPositiveNumber(value) {
  return isValidNumber(value) && Number(value) > 0;
}

function isNonNegativeNumber(value) {
  return isValidNumber(value) && Number(value) >= 0;
}

function isValidCategory(category) {
  return BOOKING_CATEGORY_VALUES.includes(category);
}

function validateRequiredFields(payload, fields = []) {
  const missingFields = fields.filter((field) => {
    const value = payload[field];

    if (typeof value === 'string') {
      return value.trim() === '';
    }

    return value === undefined || value === null;
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

module.exports = {
  isNonEmptyString,
  isValidNumber,
  isPositiveNumber,
  isNonNegativeNumber,
  isValidCategory,
  validateRequiredFields,
};