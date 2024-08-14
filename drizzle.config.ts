import Env from "@env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  driver: "turso",
  dbCredentials: {
    url: Env.DATABASE_URL,
    authToken: Env.DATABASE_AUTH_TOKEN,
  },
});
