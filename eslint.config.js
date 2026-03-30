const path = require("path");

module.exports = [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: path.resolve(__dirname, "./tsconfig.json"),
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      prettier: require("eslint-plugin-prettier"),
      import: require("eslint-plugin-import"),
      security: require("eslint-plugin-security"),
      node: require("eslint-plugin-node"),
    },
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/require-await": "error",

      // Import-related rules
      "import/no-unresolved": ["error", { commonjs: true, amd: true }],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["sibling", "parent"], "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/newline-after-import": ["error", { count: 1 }],

      // Node.js-specific rules
      "node/no-unsupported-features/es-syntax": "off",
      "node/no-extraneous-import": "error",
      "node/no-missing-import": "off", // Turn off for TypeScript resolution compatibility

      // Security rules
      "security/detect-object-injection": "warn",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: path.resolve(__dirname, "./tsconfig.json"),
        },
      },
    },
  },
];
