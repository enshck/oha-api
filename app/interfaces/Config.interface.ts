import { ENVIRONMENT } from "../shared/constants";

export interface ConfigInterface {
  env: ENVIRONMENT;
  host: string;
  port: number;
}
