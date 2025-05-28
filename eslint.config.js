// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

// export default [
//   { ignores: ['dist'] },
//   {
//     files: ['**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ]


const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginReact = require("eslint-plugin-react");
const pluginPrettier = require("eslint-plugin-prettier");

module.exports = [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": ["error"],
      "no-unused-vars": ["error", { argsIgnorePattern: "_" }],
      "no-useless-return": "error",
      "no-constant-condition": "warn",
      "no-mixed-operators": "error",
      "keyword-spacing": "error",
      "no-undef": "error",
      "no-whitespace-before-property": "error",
      "nonblock-statement-body-position": "error",
      "max-lines": ["error", { max: 5000 }],
      eqeqeq: ["error", "always"],
      "array-callback-return": ["error", { allowImplicit: false }],
      "for-direction": "error",
      "no-fallthrough": "error",
      "prefer-const": "error",
      "no-console": "error",
      "no-self-compare": "error",
      "no-unmodified-loop-condition": "error",
      "no-var": "error",
      "prefer-template": "error",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

