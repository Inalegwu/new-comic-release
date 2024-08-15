import { cleanEnv, str } from "envalid";

const Env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  DATABASE_AUTH_TOKEN: str(),
  LOCAL_DB: str(),
});

export default Env;
