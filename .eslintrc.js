module.exports = {
	root: true,
	parserOptions: { 
		ecmaVersion: 6,
		sourceType: 'module'
	},
	env: {
		es6: true,
		browser: true
	},
	plugins: [
		'@typescript-eslint',
	],
    extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: "@typescript-eslint/parser",
	rules: {}
}
