module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/recommended',
		'@vue/standard'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		// standard eslint rules
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

		'comma-dangle': 'off',
		'eol-last': 'off',
		'no-returns-assign': 'off',
		'no-tabs': 'off',
		semi: 'off',

		indent: ['warn', 'tab'],
		'space-before-function-paren': ['warn', 'never'],

		// vue plugin rules
		'vue/html-indent': ['warn', 'tab'],
		'vue/html-self-closing': ['warn', {
			html: {
				void: 'never',
				normal: 'any',
				component: 'always'
			}
		}],

	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				jest: true
			}
		}
	]
}
