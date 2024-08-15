import Env from "@env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const client = postgres(Env.DATABASE_URL);

export const db = drizzle(client, { schema });
