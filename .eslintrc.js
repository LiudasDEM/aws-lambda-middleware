module.exports = {
	env: {
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	settings: {},
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single'],
		'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
		'no-trailing-spaces': 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'ignore' }],
		'keyword-spacing': ['error', { 'before': true }],
		'space-in-parens': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug'] }],
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
		}],
		'eol-last': ['error'],
		'require-atomic-updates': [0],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
	},
};
