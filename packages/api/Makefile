build:
	npx tsc --module commonjs --outDir dist/cjs/
	echo '{"type": "commonjs"}' > dist/cjs/package.json
	npx tsc --module es2022 --outDir dist/esm/
	echo '{"type": "module"}' > dist/esm/package.json
