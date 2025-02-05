import 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      surname: string
      phoneNumber: string | null
      description: string | null
      access_token: string
      expiresIn: number
    }
  }

  interface User {
    id: string
    email: string
    name: string
    surname: string
    phoneNumber: string | null
    description: string | null
    access_token: string
    expiresIn: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string
      email: string
      name: string
      surname: string
      phoneNumber: string | null
      description: string | null
      access_token: string
      expiresIn: number
    }
  }
}
