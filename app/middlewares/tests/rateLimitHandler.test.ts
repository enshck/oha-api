import limit from "../rateLimitHandler";

describe("rateLimitHandler", () => {
  it("exports a middleware function", () => {
    expect(typeof limit).toBe("function");
  });

  it("allows requests under the limit", async () => {
    const ctx = {
      ip: "127.0.0.1",
      method: "GET",
      path: "/test",
      request: { body: {} },
      state: { user: null as unknown },
      set: jest.fn(),
      status: 0,
      body: undefined as unknown,
    };
    const next = jest.fn().mockResolvedValue(undefined);

    await limit(ctx as never, next);

    expect(next).toHaveBeenCalled();
    expect(ctx.status).not.toBe(429);
  });
});
