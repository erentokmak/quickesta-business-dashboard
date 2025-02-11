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
          const data = JSON.stringify({
            userNameOrEmail: credentials?.username || '',
            password: credentials?.password || '',
            remember: credentials?.remember === 'true',
          })

          try {
            const response = await login(data)

            if (response.isSuccess) {
              return {
                id: response.value.id,
                email: response.value.jsonWebToken.email,
                name: response.value.firstName,
                surname: response.value.lastName,
                phoneNumber: response.value.phoneNumber,
                username: response.value.username,
                access_token: response.value.jsonWebToken.accessToken,
                refresh_token: response.value.refreshToken,
                expiresIn: new Date(
                  response.value.jsonWebToken.expires,
                ).getTime(),
                roles: response.value.jsonWebToken.roles,
                permissions: response.value.jsonWebToken.permissions,
              }
            }

            throw new Error(JSON.stringify({ message: 'Giriş başarısız' }))
          } catch (error: any) {
            // API'den gelen hata yanıtını kontrol et
            if (error.response?.data) {
              const errorData = error.response.data
              const status = errorData.status
              const detail = errorData.detail

              // Hata durumlarına göre özel mesajlar
              if (status === 404) {
                throw new Error(
                  JSON.stringify({
                    message: 'Kullanıcı bulunamadı',
                    detail: detail,
                  }),
                )
              } else if (status === 400) {
                throw new Error(
                  JSON.stringify({
                    message: 'Şifre veya kullanıcı adı hatalı',
                    detail: 'Lütfen kullanıcı adınızı ve şifrenizi kontrol ediniz.',
                  }),
                )
              }
            }

            // Genel hata durumu
            throw new Error(
              JSON.stringify({
                message: 'Giriş yapılırken bir hata oluştu',
                detail: error.message,
              }),
            )
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
