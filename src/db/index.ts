import Env from "@env";
import { createClient } from "@libsql/client";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

config({ path: ".env" });

const client = createClient({
	url: Env.DATABASE_URL,
	authToken: Env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
