import CredentialsProvider from 'next-auth/providers/credentials'
import crypto from 'crypto'
import { login } from '@/lib/api-v1/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import type { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth'

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
) => AuthOptions

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
          try {
            const hashedPassword = crypto
              .createHash('md5')
              .update(credentials?.password || '')
              .digest('hex')

            const data = JSON.stringify({
              Email: credentials?.username || '',
              Password: hashedPassword,
            })

            const response = await login(data)
            const userData = response.Data

            if (response.Result) {
              const user = {
                id: userData.UserID.toString(),
                email: userData.Email || credentials?.username || '',
                name: userData.UserName || '',
                surname: userData.UserSurname || '',
                phoneNumber: userData.Phone,
                description: userData.Description,
                access_token: response.access_token,
                expiresIn: response.expires_in,
              }
              return user
            }
          } catch (error) {
            console.error('Authentication error:', error)
          }

          return null
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.user = user
        }
        return token
      },
      async session({ session, token }: { session: any; token: any }) {
        if (token.user) {
          session.user = token.user
        }
        return session
      },
      redirect({ url }) {
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL || 'https://dashboard.abantsu.com.tr'

        if (url.startsWith('/auth/sign-in')) {
          return `${siteUrl}/auth/sign-in`
        }

        return url.startsWith(siteUrl) ? url : siteUrl
      },
    },
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
      maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
      signIn: '/auth/sign-in',
      signOut: '/auth/sign-in',
    },
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}
