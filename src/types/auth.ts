/**
 * Authentication related types and interfaces
 */

/**
 * Register request data interface
 */
export interface IRegisterRequest {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword: string
  mobileNumber: string
  countryCode: number
}

/**
 * Login request data interface
 */
export interface ILoginRequest {
  username: string
  password: string
}

/**
 * Form data interface for sign-up page
 */
export interface ISignUpFormData {
  name: string
  surname: string
  email: string
  password: string
  mobileNumber: string
  countryCode: number
}

/**
 * Form errors interface for sign-up page
 */
export interface ISignUpFormErrors {
  name?: string
  surname?: string
  email?: string
  password?: string
  phone?: string
}

/**
 * Auth API response interface
 */
export interface IAuthResponse {
  isSuccess: boolean
  error?: string
  data?: any
}
