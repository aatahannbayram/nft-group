import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

const SESSION_COOKIE = "nft_admin_session";
const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

async function hasValidSession(request: NextRequest) {
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (!cookie) return false;
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

// Next.js 16 renamed `middleware.ts` to `proxy.ts` (function `proxy`, nodejs runtime).
// Admin routes are not localized, so they're handled separately from the
// next-intl locale proxy below with their own JWT session guard.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isLoginRoute = pathname === "/admin/login";
    const authenticated = await hasValidSession(request);

    if (!isLoginRoute && !authenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (isLoginRoute && authenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
