import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let cached: ReturnType<typeof drizzle<typeof schema>> | null = null;

/**
 * Lazily constructs the Drizzle client on first call instead of at module
 * top-level — `neon()` throws immediately if DATABASE_URL is unset, and Next
 * needs to load Server Action modules during build to register them, which
 * would otherwise crash `next build` before the env var exists.
 */
export function getDb() {
  if (!cached) {
    const sql = neon(process.env.DATABASE_URL!);
    cached = drizzle(sql, { schema });
  }
  return cached;
}
