import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const token = await getToken({ req })
  const { pathname } = req.nextUrl

  // Allow access to SSO page
  if (pathname.startsWith('/auth/sso')) {
    return NextResponse.next()
  }

  // Sadece superadmin'in erişebileceği sayfalar
  if (
    pathname.startsWith('/credits') ||
    pathname.startsWith('/users') ||
    pathname.startsWith('/roles')
  ) {
    if (!token || token.role !== 'superadmin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/credits', '/users', '/roles', '/auth/sso'],
}
