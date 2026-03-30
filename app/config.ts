import { ConfigInterface } from "./interfaces";
import { ENVIRONMENT } from "./shared/constants";

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";

require("dotenv").config({ path: envFile });

const common: ConfigInterface = {
  env: (process.env.NODE_ENV as ENVIRONMENT) || ENVIRONMENT.development,
  host: process.env.HOST,
  port: Number(process.env.PORT),
};

const development: ConfigInterface = {
  ...common,
};

interface EnvConfigInterface {
  [key: string]: ConfigInterface;
}

const config: EnvConfigInterface = {
  development,
};

export default config[process.env.NODE_ENV || "development"];
