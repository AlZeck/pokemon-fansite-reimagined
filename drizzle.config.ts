import type { Config } from "drizzle-kit";
import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: z.string().parse(process.env.DATABASE_URL),
  },
} satisfies Config;
