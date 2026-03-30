import * as http from "http";

import * as Koa from "koa";
import { koaSwagger } from "koa2-swagger-ui";

import config from "./config";
import middlewares from "./middlewares";
import router from "./routes";
import { ENVIRONMENT } from "./shared/constants";

const { host, port, env } = config;

const app = new Koa();

app.use(middlewares());

app.use(router.routes());

app.use(
  koaSwagger({
    routePrefix: "/swagger",
    swaggerOptions: {
      url: env === ENVIRONMENT.development ? `http://${host}:${port}/api/v1/swagger.json` : `/api/v1/swagger.json`,
    },
  }),
);

//eslint-disable-next-line
(async () => {
  try {
    const server = http.createServer(app.callback());

    server.listen(port, host, () => {
      console.log(`listening on http://${host}:${port}`);
    });
  } catch (e) {
    console.error("ERROR ON SERVER STARTUP", e);
    process.exit(1);
  }
})();

export default {
  app,
};

export { app };
