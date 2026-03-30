import * as bodyParser from "koa-bodyparser";
import { compose } from "koa-convert";
import * as helmet from "koa-helmet";
//eslint-disable-next-line
// @ts-ignore
import * as respond from "koa-respond";
//eslint-disable-next-line
// @ts-ignore
import * as responseTime from "koa-response-time";
import * as cors from "koa2-cors";

import errorHandler from "./errorHandler";
import { bodyParserOptions, corsOptions, helmetOptions, respondOptions } from "./options";
import limit from "./rateLimitHandler";

const middlewares = [
  responseTime(),
  helmet(helmetOptions),
  respond(respondOptions),
  bodyParser(bodyParserOptions),
  cors(corsOptions),
  errorHandler,
  limit,
];

export default () => compose(...middlewares);
