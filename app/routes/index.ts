import * as Router from "koa-router";

import logs from "./locations";
import { swagger } from "./swagger";

const routes = [logs];

const router = new Router({ prefix: "/api/v1" });

routes.forEach((route) => {
  router.use(route.middleware());
});

router.get("/swagger.json", swagger);

export default router;
