import { swagger } from "../swagger";

const createCtx = () => ({ body: undefined as unknown });

describe("swagger route handler", () => {
  it("sets ctx.body to a string", () => {
    const ctx = createCtx();
    swagger(ctx as never);
    expect(typeof ctx.body).toBe("string");
  });

  it("body is valid JSON", () => {
    const ctx = createCtx();
    swagger(ctx as never);
    expect(() => JSON.parse(ctx.body as string)).not.toThrow();
  });

  it("spec contains info block with title and description", () => {
    const ctx = createCtx();
    swagger(ctx as never);
    const spec = JSON.parse(ctx.body as string);
    expect(spec.info.title).toBe("API");
    expect(spec.info.description).toBeDefined();
  });

  it("spec basePath is /api/v1/", () => {
    const ctx = createCtx();
    swagger(ctx as never);
    const spec = JSON.parse(ctx.body as string);
    expect(spec.basePath).toBe("/api/v1/");
  });

  it("spec contains paths for locations routes", () => {
    const ctx = createCtx();
    swagger(ctx as never);
    const spec = JSON.parse(ctx.body as string);
    const paths = Object.keys(spec.paths ?? {});
    expect(paths.some((p) => p.includes("cities"))).toBe(true);
    expect(paths.some((p) => p.includes("countries"))).toBe(true);
    expect(paths.some((p) => p.includes("continents"))).toBe(true);
  });
});
