/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["tsbase"],
  env: {
    node: true,
    jest: true
  },
  parserOptions: {
    project: "../tsconfig/nestjs.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
};
