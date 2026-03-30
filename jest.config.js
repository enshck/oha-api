module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/app"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
    "^.+\\.js$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  transformIgnorePatterns: ["/node_modules/(?!uuid/)"],
  collectCoverageFrom: [
    "app/**/*.ts",
    "!app/definition/**",
    "!app/app.ts",
    "!app/**/index.ts",
    "!app/**/*.d.ts",
  ],
  coverageDirectory: "coverage",
};
