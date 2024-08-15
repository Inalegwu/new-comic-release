import Env from "@env";
import { Database } from "bun:sqlite";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

config({ path: ".env" });

// const client = createClient({
//   url: Env.DATABASE_URL,
//   authToken: Env.DATABASE_AUTH_TOKEN,
// });
const sqlite = new Database(Env.LOCAL_DB);

export const db = drizzle(sqlite, { schema });
