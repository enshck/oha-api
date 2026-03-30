import bodyParserOptions from "../options/bodyparser.options";
import corsOptions from "../options/cors.options";
import helmetOptions from "../options/helmet.options";
import respondOptions from "../options/respond.options";

describe("middleware options", () => {
  describe("bodyparser.options", () => {
    it("enables json, form and raw types", () => {
      expect(bodyParserOptions.enableTypes).toEqual(expect.arrayContaining(["json", "form", "raw"]));
    });

    it("sets reasonable size limits", () => {
      expect(bodyParserOptions.jsonLimit).toBe("10mb");
      expect(bodyParserOptions.formLimit).toBe("50mb");
      expect(bodyParserOptions.textLimit).toBe("10mb");
    });

    it("has strict false and multipart true", () => {
      expect(bodyParserOptions.strict).toBe(false);
      expect(bodyParserOptions.multipart).toBe(true);
    });
  });

  describe("cors.options", () => {
    it("allows all origins", () => {
      expect(corsOptions.origin).toBe("*");
    });

    it("allows standard HTTP methods", () => {
      expect(corsOptions.allowMethods).toEqual(
        expect.arrayContaining(["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]),
      );
    });

    it("allows Authorization header", () => {
      expect(corsOptions.allowHeaders).toContain("Authorization");
    });
  });

  describe("helmet.options", () => {
    it("disables contentSecurityPolicy", () => {
      expect(helmetOptions.contentSecurityPolicy).toBe(false);
    });

    it("enables xssFilter and noSniff", () => {
      expect(helmetOptions.xssFilter).toBe(true);
      expect(helmetOptions.noSniff).toBe(true);
    });

    it("enables hsts and hidePoweredBy", () => {
      expect(helmetOptions.hsts).toBe(true);
      expect(helmetOptions.hidePoweredBy).toBe(true);
    });
  });

  describe("respond.options", () => {
    it("maps unprocessableEntity to 422", () => {
      expect(respondOptions.statusMethods.unprocessableEntity).toBe(422);
    });

    it("maps entityExist to 409", () => {
      expect(respondOptions.statusMethods.entityExist).toBe(409);
    });
  });
});
