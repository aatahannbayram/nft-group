import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const COOKIE_NAME = "nft_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

type SessionPayload = JWTPayload & { role: "admin" };

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decrypt(session: string | undefined) {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession() {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await encrypt({ role: "admin" });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Cached per-request so multiple calls (layout + page + actions) only
 * decrypt the JWT once. Use this as the single source of truth for
 * "is the current request an authenticated admin".
 */
export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get(COOKIE_NAME)?.value);
  return session?.role === "admin";
});

/**
 * Guard for Server Actions. The (protected) layout's redirect only covers
 * page navigation — Server Actions are directly POST-able and must verify
 * the session themselves. Call this first in every admin mutation instead
 * of re-checking verifySession() inline, so the "unauthorized" behavior
 * (and any future change to it, e.g. logging or roles) lives in one place.
 */
export async function requireAdmin() {
  if (!(await verifySession())) {
    throw new Error("Unauthorized");
  }
}
