class Validator {
  static validateString(value, fieldName) {
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error(`${fieldName} must be a non-empty string`);
    }
    return value.trim();
  }

  static validateNumber(value, fieldName, min, max, defaultValue) {
    if (value === undefined) {
      return defaultValue;
    }
    const num = Number(value);
    if (isNaN(num) || num < min || num > max) {
      throw new Error(`${fieldName} must be a number between ${min} and ${max}`);
    }
    return num;
  }

  static validateBoolean(value, fieldName, defaultValue) {
    if (value === undefined) {
      return defaultValue;
    }
    return Boolean(value);
  }
}

module.exports = Validator;