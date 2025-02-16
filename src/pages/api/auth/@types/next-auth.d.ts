import 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      surname: string
      phoneNumber: string
      username: string
      accessToken: string
      refreshToken: string
      expiresIn: number
      roles: string[]
      permissions: string[]
    }
  }

  interface User {
    id: string
    email: string
    name: string
    surname: string
    phoneNumber: string
    username: string
    accessToken: string
    refreshToken: string
    expiresIn: number
    roles: string[]
    permissions: string[]
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string
      email: string
      name: string
      surname: string
      phoneNumber: string
      username: string
      accessToken: string
      refreshToken: string
      expiresIn: number
      roles: string[]
      permissions: string[]
    }
  }
}
