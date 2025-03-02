import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '@/lib/api-v1/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import type { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import jwt from 'jsonwebtoken'

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
) => AuthOptions

// JWT doğrulama için kullanılacak secret key
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'E-posta', type: 'text' },
          password: { label: 'Şifre', type: 'password' },
          remember: { label: 'Beni hatırla', type: 'checkbox' },
          ssoToken: { label: 'SSO Token', type: 'text' },
        },
        authorize: async (credentials) => {
          // SSO token ile giriş
          if (credentials?.ssoToken) {
            try {
              // Token'ı doğrula
              const decoded = jwt.verify(credentials.ssoToken, JWT_SECRET) as any

              // Token geçerliyse kullanıcı bilgilerini döndür
              if (decoded && decoded.email) {
                return {
                  id: decoded.id || decoded.sub,
                  email: decoded.email,
                  name: decoded.name,
                  surname: decoded.surname,
                  phoneNumber: decoded.phoneNumber,
                  username: decoded.username,
                  accessToken: decoded.accessToken,
                  refreshToken: decoded.refreshToken,
                  expiresIn: decoded.expiresIn,
                  roles: decoded.roles,
                  permissions: decoded.permissions,
                }
              }
              
              throw new Error('Geçersiz SSO token')
            } catch (error) {
              console.error('SSO Token Error:', error)
              throw new Error('SSO token doğrulanamadı')
            }
          }

          // Normal kimlik bilgileri ile giriş
          const data = JSON.stringify({
            userNameOrEmail: credentials?.email || '',
            password: credentials?.password || '',
            remember: credentials?.remember === 'true',
          })
          try {
            const response = await login(JSON.parse(data))

            if (response.isSuccess) {
              return {
                id: response.value.id,
                email: response.value.jsonWebToken.email,
                name: response.value.firstName,
                surname: response.value.lastName,
                phoneNumber: response.value.phoneNumber,
                username: response.value.username,
                accessToken: response.value.jsonWebToken.accessToken,
                refreshToken: response.value.refreshToken,
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
              if (status == 404) {
                throw new Error(
                  JSON.stringify({
                    message: 'Kullanıcı bulunamadı',
                    detail: detail,
                  }),
                )
              } else if (status == 400) {
                throw new Error(
                  JSON.stringify({
                    message: 'Şifre veya kullanıcı adı hatalı',
                    detail:
                      'Lütfen kullanıcı adınızı ve şifrenizi kontrol ediniz.',
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
