import Env from "@env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: Env.DATABASE_URL,
    // authToken: Env.DATABASE_AUTH_TOKEN,
  },
});
