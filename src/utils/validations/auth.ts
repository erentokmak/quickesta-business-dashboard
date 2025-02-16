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
   * Matches passwords with at least:
   * - 1 uppercase letter
   * - 1 lowercase letter
   * - 1 number
   * - 1 special character
   */
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
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
    format:
      'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir',
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
  .regex(authRegex.password, authMessages.password.format)

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
