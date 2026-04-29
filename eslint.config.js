module.exports = [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        alert: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
];
