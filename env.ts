import { config } from "dotenv";
import { cleanEnv, str } from "envalid";

config({ path: ".env" });

const Env = cleanEnv(process.env, {
  DATABASE_URL: str(),
});

export default Env;
