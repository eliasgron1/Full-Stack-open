import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'
import babelParser from '@babel/eslint-parser'
import reactPlugin from 'eslint-plugin-react'
import vitestGlobalsPlugin from 'eslint-plugin-vitest-globals'


export default [
	{
		files: ["**/*.{js,jsx}"],
		languageOptions: {
			sourceType: "module", // or "commonjs" based on your setup
			globals: {
				...globals.browser,
				...vitestGlobalsPlugin.environments.env.globals,
			},
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false, // Allows parsing without a Babel config file
				babelOptions: {
					presets: ["@babel/preset-react"],
				},
			},
		},
		plugins: {
			'@stylistic/js': stylisticJs,
			'react': reactPlugin,
			'vitest-globals': vitestGlobalsPlugin,
		},
		rules: {
			"react/jsx-uses-vars": "error",
			"react/jsx-uses-react": "error",

			"indent": [
				"error",
				2
			],
			"quotes": [
				"error",
				"single"
			],
			"semi": [
				"error",
				"never"
			],
			"eqeqeq": "error",
			"no-trailing-spaces": "error",
			"object-curly-spacing": [
				"error", "always"
			],
			"arrow-spacing": [
				"error", { "before": true, "after": true }
			],
			"no-console": 0,
			"react/react-in-jsx-scope": "off",
			"react/prop-types": 0,
			"no-unused-vars":
				"error",
		},
	},
	{ ignores: ["**/dist/", "**/eslint.config.mjs", "**/tests", "**/vite.config.js"] },
	pluginJs.configs.recommended
]