import { ParameterizedContext } from "koa";
import { SwaggerAPI } from "koa-joi-router-docs-v2";

import logs from "./locations";

const generator = new SwaggerAPI();

[logs].forEach((route) => {
  generator.addJoiRouter(route);
});

const spec = generator.generateSpec(
  {
    info: {
      title: "API",
      description: "API for backend.",
      version: process.env.npm_package_version,
    },
    basePath: "/api/v1/",
    tags: [],
  },
  {},
  new Proxy(
    {},
    {
      get: (_, key: string) => {
        return key.replace("//", "/");
      },
    },
  ),
);

export const swagger = (ctx: ParameterizedContext) => {
  ctx.body = JSON.stringify(spec, null, "  ");
};
