import CredentialsProvider from 'next-auth/providers/credentials'
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
          remember: { label: 'Remember me', type: 'checkbox' },
        },
        authorize: async (credentials) => {
          try {
            const data = JSON.stringify({
              userNameOrEmail: credentials?.username || '',
              password: credentials?.password || '',
              remember: credentials?.remember === 'true',
            })
            const response = await login(data)
            
            if (response.isSuccess) {
              const userData = response.value
              const user = {
                id: userData.id,
                email: userData.jsonWebToken.email,
                name: userData.firstName,
                surname: userData.lastName,
                phoneNumber: userData.phoneNumber,
                username: userData.username,
                access_token: userData.jsonWebToken.accessToken,
                refresh_token: userData.refreshToken,
                expiresIn: new Date(userData.jsonWebToken.expires).getTime(),
                roles: userData.jsonWebToken.roles,
                permissions: userData.jsonWebToken.permissions,
              }
              return user
            }

            if (response.status === 404) {
              throw new Error(JSON.stringify({
                detail: 'Kullanıcı adı veya şifre hatalı',
                status: 404,
                title: 'Giriş Başarısız'
              }))
            }

            const errorMessage = {
              400: 'Geçersiz istek',
              401: 'Yetkisiz erişim',
              403: 'Erişim reddedildi',
              500: 'Sunucu hatası',
            }[response.status] || 'Bir hata oluştu'

            throw new Error(JSON.stringify({
              detail: response.error || errorMessage,
              status: response.status || 400,
              title: response.title || 'Hata'
            }))

          } catch (error) {
            
            if (typeof error === 'string') {
              throw new Error(error)
            }
            
            if (error instanceof Error) {
              throw new Error(error.message)
            }

            throw new Error(JSON.stringify({
              detail: 'Beklenmeyen bir hata oluştu',
              status: 500,
              title: 'Sunucu Hatası'
            }))
          }
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
          process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        if (url.startsWith('/auth/sign-in')) {
          return `${siteUrl}/auth/sign-in`
        }

        return url.startsWith(siteUrl) ? url : siteUrl
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
      maxAge: 30 * 24 * 60 * 60, // 30 days
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
