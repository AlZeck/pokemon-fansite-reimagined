import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "@/env.mjs";

const globalForDrizzle = globalThis as unknown as {
  drizzle: PostgresJsDatabase<typeof schema> | undefined;
};

const createDBClient = () => {
  const client = postgres(env.DATABASE_URL);
  return drizzle(client, { schema });
};

export const db = globalForDrizzle.drizzle ?? createDBClient();

if (env.NODE_ENV !== "production") globalForDrizzle.drizzle = db;
