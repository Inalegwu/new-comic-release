import Env from "@env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: Env.LOCAL_DB,
    // authToken: Env.DATABASE_AUTH_TOKEN,
  },
});
