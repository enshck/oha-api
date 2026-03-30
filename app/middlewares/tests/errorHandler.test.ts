import { StatusCodes } from "http-status-codes";

import errorHandler from "../errorHandler";

const createCtx = () => ({
  status: 0,
  httpStatus: 0,
  body: undefined as unknown,
  app: { emit: jest.fn() },
});

describe("errorHandler middleware", () => {
  it("calls next and does not modify ctx when no error thrown", async () => {
    const ctx = createCtx();
    const next = jest.fn().mockResolvedValue(undefined);

    await errorHandler(ctx as never, next);

    expect(next).toHaveBeenCalled();
    expect(ctx.body).toBeUndefined();
  });

  it("catches error and sets ctx.status from httpStatus", async () => {
    const ctx = createCtx();
    const err = Object.assign(new Error("Not found"), { httpStatus: StatusCodes.NOT_FOUND });
    const next = jest.fn().mockRejectedValue(err);

    await errorHandler(ctx as never, next);

    expect(ctx.status).toBe(StatusCodes.NOT_FOUND);
    expect(ctx.body).toEqual({ code: StatusCodes.NOT_FOUND, message: "Not found" });
    expect(ctx.app.emit).toHaveBeenCalledWith("error", err, ctx);
  });

  it("falls back to INTERNAL_SERVER_ERROR when error has no status", async () => {
    const ctx = createCtx();
    const err = new Error("boom");
    const next = jest.fn().mockRejectedValue(err);

    await errorHandler(ctx as never, next);

    expect(ctx.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(ctx.body).toEqual({ code: StatusCodes.INTERNAL_SERVER_ERROR, message: "boom" });
  });

  it("handles Joi validation error: single detail", async () => {
    const ctx = createCtx();
    const err = Object.assign(new Error("joi"), {
      isJoi: true,
      statusCode: 422,
      details: [{ httpStatus: 400, message: "name is required" }],
    });
    const next = jest.fn().mockRejectedValue(err);

    await errorHandler(ctx as never, next);

    expect(ctx.body).toEqual(expect.objectContaining({ message: "name is required" }));
  });

  it("handles Joi validation error: multiple details joined", async () => {
    const ctx = createCtx();
    const err = Object.assign(new Error("joi"), {
      isJoi: true,
      statusCode: 422,
      details: [
        { httpStatus: 400, message: "field A required" },
        { httpStatus: 400, message: "field B required" },
      ],
    });
    const next = jest.fn().mockRejectedValue(err);

    await errorHandler(ctx as never, next);

    expect((ctx.body as { message: string }).message).toBe("field A required,field B required");
  });

  it("handles Joi validation error with empty details array", async () => {
    const ctx = createCtx();
    const err = Object.assign(new Error("joi"), {
      isJoi: true,
      statusCode: 422,
      details: [],
    });
    const next = jest.fn().mockRejectedValue(err);

    await errorHandler(ctx as never, next);

    expect((ctx.body as { message: string }).message).toBe("Bad Request");
  });
});
