import "dotenv/config";
import type { Config } from "drizzle-kit";

if (!process.env.DB_URI) {
  throw Error("env var DB_URI not set!");
}

export default {
  driver: "mysql2",
  dbCredentials: { connectionString: process.env.DB_URI },
  schema: "./src/db/schema/index.ts",
  out: "./.drizzle",
  breakpoints: true,
} satisfies Config;
