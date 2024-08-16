import { config } from "dotenv";
import { cleanEnv, str } from "envalid";

config({ path: ".env" });

const Env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  // DISCORD_APP_ID: str(),
  // DISCORD_PUBLIC_KEY: str(),
});

export default Env;
