import { cleanEnv, str } from "envalid";

const Env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  DATABASE_AUTH_TOKEN: str(),
});

export default Env;
