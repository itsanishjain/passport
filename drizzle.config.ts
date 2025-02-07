import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || "./src/drizzle/dev.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
});
