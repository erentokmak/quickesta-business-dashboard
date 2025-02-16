import { z } from 'zod'

/**
 * Regular expressions for validation
 */
export const authRegex = {
  /**
   * Matches names containing only letters and Turkish characters
   */
  name: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,

  /**
   * Password validation patterns
   */
  passwordPatterns: {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /[0-9]/,
    special: /[@$!%*?&#]/, // Added & and # as valid special characters
  },
} as const

/**
 * Validation messages in Turkish
 */
export const authMessages = {
  name: {
    min: 'En az 2 karakter olmalıdır',
    max: 'En fazla 50 karakter olabilir',
    format: 'Sadece harflerden oluşmalıdır',
  },
  email: {
    invalid: 'Geçerli bir e-posta adresi giriniz',
    min: 'E-posta en az 5 karakter olmalıdır',
    max: 'E-posta en fazla 100 karakter olabilir',
  },
  password: {
    min: 'Şifre en az 8 karakter olmalıdır',
    max: 'Şifre en fazla 100 karakter olabilir',
    lowercase: 'En az bir küçük harf içermelidir',
    uppercase: 'En az bir büyük harf içermelidir',
    number: 'En az bir rakam içermelidir',
    special: 'En az bir özel karakter (@$!%*?&#) içermelidir',
  },
  phone: {
    invalid: 'Geçerli bir telefon numarası giriniz',
  },
} as const

/**
 * Zod schema for name validation
 */
export const nameSchema = z
  .string()
  .min(2, authMessages.name.min)
  .max(50, authMessages.name.max)
  .regex(authRegex.name, authMessages.name.format)

/**
 * Zod schema for email validation
 */
export const emailSchema = z
  .string()
  .email(authMessages.email.invalid)
  .min(5, authMessages.email.min)
  .max(100, authMessages.email.max)

/**
 * Zod schema for password validation
 */
export const passwordSchema = z
  .string()
  .min(8, authMessages.password.min)
  .max(100, authMessages.password.max)
  .refine((value) => authRegex.passwordPatterns.lowercase.test(value), {
    message: authMessages.password.lowercase,
  })
  .refine((value) => authRegex.passwordPatterns.uppercase.test(value), {
    message: authMessages.password.uppercase,
  })
  .refine((value) => authRegex.passwordPatterns.number.test(value), {
    message: authMessages.password.number,
  })
  .refine((value) => authRegex.passwordPatterns.special.test(value), {
    message: authMessages.password.special,
  })

/**
 * Zod schema for phone validation
 */
export const phoneSchema = z.string().min(10, authMessages.phone.invalid)

/**
 * Complete sign-up form validation schema
 */
export const signUpSchema = z.object({
  name: nameSchema,
  surname: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
})

/**
 * Type for sign-up form values
 */
export type SignUpFormValues = z.infer<typeof signUpSchema>

/**
 * Validates a single field with its schema
 * @param field - Field name
 * @param value - Field value
 * @param schema - Zod schema for validation
 */
export const validateField = (
  field: keyof SignUpFormValues,
  value: string,
  schema: z.ZodType<any>,
): string | null => {
  try {
    schema.parse(value)
    return null
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message
    }
    return 'Validation error'
  }
}

/**
 * Validates the complete sign-up form
 * @param values - Form values
 */
export const validateSignUpForm = (
  values: Partial<SignUpFormValues>,
): Record<string, string | null> => {
  const result: Record<string, string | null> = {}

  if (values.name) {
    result.name = validateField('name', values.name, nameSchema)
  }
  if (values.surname) {
    result.surname = validateField('surname', values.surname, nameSchema)
  }
  if (values.email) {
    result.email = validateField('email', values.email, emailSchema)
  }
  if (values.password) {
    result.password = validateField('password', values.password, passwordSchema)
  }
  if (values.phone) {
    result.phone = validateField('phone', values.phone, phoneSchema)
  }

  return result
}

/**
 * Checks if all required fields are filled
 * @param formData - Form data to check
 * @param fields - Required field names
 * @returns Error message if any field is empty, null if all fields are filled
 */
export const validateRequiredFields = (
  formData: Record<string, any>,
  fields: string[],
): string | null => {
  const emptyFields = fields.filter(field => !formData[field])
  return emptyFields.length > 0 ? 'Lütfen tüm alanları doldurunuz.' : null
}

/**
 * Validates sign-in form data
 * @param formData - Sign-in form data
 * @returns Object containing validation errors
 */
export const validateSignInForm = (formData: { email: string; password: string }) => {
  // Check required fields
  const requiredError = validateRequiredFields(formData, ['email', 'password'])
  if (requiredError) {
    return {
      isValid: false,
      error: requiredError
    }
  }

  // Validate email and password
  try {
    emailSchema.parse(formData.email)
    passwordSchema.parse(formData.password)
    return { isValid: true, error: null }
  } catch (error: any) {
    return {
      isValid: false,
      error: error.errors[0].message
    }
  }
}

/**
 * Validates sign-up form data
 * @param formData - Sign-up form data
 * @returns Object containing validation errors
 */
export const validateSignUpFormFields = (formData: Record<string, any>) => {
  // Check required fields
  const requiredFields = ['name', 'surname', 'email', 'password', 'mobileNumber']
  const requiredError = validateRequiredFields(formData, requiredFields)
  if (requiredError) {
    return {
      isValid: false,
      error: requiredError
    }
  }

  // Validate all fields
  const validationErrors = validateSignUpForm({
    name: formData.name,
    surname: formData.surname,
    email: formData.email,
    password: formData.password,
    phone: formData.mobileNumber,
  })

  const hasErrors = Object.values(validationErrors).some(error => error !== null)
  if (hasErrors) {
    return {
      isValid: false,
      error: 'Lütfen tüm alanları doğru şekilde doldurunuz.',
      fieldErrors: validationErrors
    }
  }

  return { isValid: true, error: null }
}
