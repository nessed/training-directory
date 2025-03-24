import { config } from 'dotenv';
config(); // ✅ MUST be before any env access

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!);
console.log("🔎 DATABASE_URL:", process.env.DATABASE_URL); // For debugging

export const db = drizzle(client); // ✅ Correct
