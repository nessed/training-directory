import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load environment variables from `.env.local`
config({ path: '.env.local' });

export default defineConfig({
  schema: './src/db/schema.ts', // Path to your schema file
  out: './supabase/migrations',  // Where the migration files should be output
  dialect: 'postgresql',         // Use PostgreSQL (Supabase uses it)
  dbCredentials: {
    url: process.env.DATABASE_URL!,  // Make sure this is referencing the correct environment variable
  },
});
