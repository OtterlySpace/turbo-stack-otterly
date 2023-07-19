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
	rules: {
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksVoidReturn: false
			}
		]
	},
	ignorePatterns: ["node_modules", ".eslintrc.cjs", "index.cjs"]
}
