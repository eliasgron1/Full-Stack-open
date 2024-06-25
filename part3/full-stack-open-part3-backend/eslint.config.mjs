import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'


export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      "react/prop-types": "off",
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
      "react/prop-types": "off",
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
];