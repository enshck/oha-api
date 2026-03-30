describe("config", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  const loadConfig = () => require("../config").default as { env: string; host: string; port: number };

  it("reads HOST and PORT from process.env", () => {
    process.env.NODE_ENV = "development";
    process.env.HOST = "127.0.0.1";
    process.env.PORT = "5000";

    const config = loadConfig();

    expect(config.host).toBe("127.0.0.1");
    expect(config.port).toBe(5000);
  });

  it("converts PORT to a number", () => {
    process.env.NODE_ENV = "development";
    process.env.PORT = "8080";

    const config = loadConfig();

    expect(typeof config.port).toBe("number");
    expect(config.port).toBe(8080);
  });

  it("sets env to development when NODE_ENV=development", () => {
    process.env.NODE_ENV = "development";

    const config = loadConfig();

    expect(config.env).toBe("development");
  });

  it("falls back to development config when NODE_ENV is not set", () => {
    delete process.env.NODE_ENV;
    process.env.HOST = "0.0.0.0";
    process.env.PORT = "4000";

    const config = loadConfig();

    expect(config.env).toBe("development");
    expect(config.host).toBe("0.0.0.0");
  });

  it("loads .env file without NODE_ENV suffix when NODE_ENV is not set", () => {
    delete process.env.NODE_ENV;

    // should not throw — dotenv silently ignores missing files
    expect(() => loadConfig()).not.toThrow();
  });

  it("returns undefined when NODE_ENV does not exist in config map", () => {
    process.env.NODE_ENV = "unknown-env";

    const config = loadConfig();

    expect(config).toBeUndefined();
  });

  it("uses default .env file when NODE_ENV is empty string", () => {
    process.env.NODE_ENV = "";
    process.env.HOST = "localhost";
    process.env.PORT = "3000";

    // Should use fallback .env file and still load development config
    const config = loadConfig();

    expect(config.env).toBe("development");
  });

  it("falls back to ENVIRONMENT.development when env value is falsy", () => {
    process.env.NODE_ENV = "development";
    delete process.env.HOST;
    delete process.env.PORT;

    const config = loadConfig();

    expect(config.env).toBe("development");
    expect(config.host).toBeUndefined();
  });
});
