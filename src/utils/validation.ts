export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateForm = (
  data: Record<string, string>,
  rules: Record<string, ValidationRule>
): ValidationResult => {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field] || '';

    if (rule.required && !value.trim()) {
      errors[field] = 'This field is required';
      return;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `Minimum length is ${rule.minLength} characters`;
      return;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `Maximum length is ${rule.maxLength} characters`;
      return;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = 'Invalid format';
      return;
    }

    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        errors[field] = customError;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  tournamentName: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 500,
  },
}; 