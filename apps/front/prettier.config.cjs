/** @type {import("prettier").Config} */
const config = {
  ...require("prettier-config"),
	plugins: [require.resolve("prettier-plugin-tailwindcss")]
}

module.exports = config
