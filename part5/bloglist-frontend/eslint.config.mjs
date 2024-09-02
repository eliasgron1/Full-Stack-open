import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'
//import reactRefresh from 'eslint-plugin-react-refresh'
//import reactRecommended from 'react/recommended'
//import jsxRuntime from 'react/jsx-runtime'
//import reactHooksRecommended from 'react-hooks/recommended'

export default [
	{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
	{ languageOptions: { globals: globals.browser } },
	{
		plugins: {
			'@stylistic/js': stylisticJs,
		},
		rules: {
			"parserOptions": {
				"sourceType": "module"
			},
			"react/prop-types": 0,
			'eqeqeq': 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': [
				'error', 'always'
			],
			'arrow-spacing': [
				'error', { 'before': true, 'after': true }
			],
			'no-console': 0,
			'@stylistic/js/indent': [
				'error',
				2
			],
			'@stylistic/js/quotes': [
				'error',
				'single'
			],
			'@stylistic/js/semi': [
				'error',
				'never'
			],
		},
	},
	{ ignores: ["**/dist/", "**/eslint.config.mjs"] },
	pluginJs.configs.recommended,
]