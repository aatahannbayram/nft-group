import "server-only";
import nodemailer from "nodemailer";

let cached: ReturnType<typeof nodemailer.createTransport> | null = null;

/**
 * Lazily constructs the SMTP transport on first call — mirrors getDb()'s
 * pattern so a missing env var doesn't crash `next build` when this module
 * is loaded to register the Server Action.
 */
export function getMailer() {
  if (!cached) {
    cached = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return cached;
}
