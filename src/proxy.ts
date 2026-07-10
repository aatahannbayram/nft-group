import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

// Next.js 16 renamed `middleware.ts` to `proxy.ts` (function `proxy`, nodejs runtime).
// Admin routes are not localized and get their own auth guard here once
// the JWT session is wired up (see task: admin auth).
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
