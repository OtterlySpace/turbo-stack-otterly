/** @type {import("eslint").Linter.Config} */
module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "../tsconfig/base.json",
		tsconfigRootDir: __dirname,
		sourceType: "module"
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:prettier/recommended",
		"turbo",
		"prettier"
	],
	rules: {
		"prettier/prettier": ["error", {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{ args: "after-used", ignoreRestSiblings: true, argsIgnorePattern: "^_" }
		],
		"no-unused-vars": ["warn", { args: "after-used", ignoreRestSiblings: true, argsIgnorePattern: "^_" }],
		"no-multi-spaces": "error",
		"no-trailing-spaces": "error",
		"arrow-spacing": "error"
	},
	parserOptions: {
		babelOptions: {
			presets: [require.resolve("next/babel")]
		}
	},
	ignorePatterns: ["node_modules", ".eslintrc.cjs", "index.cjs"]
}
