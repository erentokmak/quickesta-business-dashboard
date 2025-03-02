import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { getSession } from 'next-auth/react'

// JWT doğrulama için kullanılacak secret key
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Sadece GET isteklerine izin ver
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Token'ı query parametresinden al
    const { token, redirect } = req.query

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Token is required' })
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, JWT_SECRET)

    // Kullanıcı bilgilerini al
    const userData = typeof decoded === 'object' ? decoded : {}

    // Oturum oluştur
    // Not: Burada gerçek uygulamada NextAuth.js ile oturum oluşturma işlemi yapılmalıdır
    // Bu örnek sadece konsept gösterimi içindir

    // Yönlendirme URL'i
    const redirectUrl = redirect ? String(redirect) : '/dashboard'

    // Başarılı yanıt
    return res.status(200).json({
      success: true,
      message: 'SSO authentication successful',
      redirect: redirectUrl,
      user: userData,
    })
  } catch (error) {
    console.error('SSO Error:', error)
    return res.status(401).json({ error: 'Invalid token' })
  }
} 