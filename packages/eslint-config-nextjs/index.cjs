/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["tsbase", "next/core-web-vitals"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
