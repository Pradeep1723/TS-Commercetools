import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';

export default [
	{
		files: ['**/*.{js,mjs,cjs,ts}']
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser
			}
		}
	},
	{
		plugins: {
			import: importPlugin,
			promise: promisePlugin,
			security: securityPlugin
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			// Formatting and Code Style
			semi: ['error', 'always'], // Enforce semicolons
			quotes: ['error', 'single'], // Enforce single quotes
			'no-unused-vars': 'warn', // Warn for unused variables

			// Best Practices
			eqeqeq: ['error', 'always'], // Enforce strict equality `===`
			curly: 'error', // Always use curly braces for blocks
			'no-console': 'warn', // Warn for console.log (often used in dev, not in production)
			'no-debugger': 'error', // Disallow debugger (often forgotten in production)
			'import/no-unresolved': 'error', // Ensure imports point to valid modules
			'import/order': ['error', { 'newlines-between': 'always' }], // Enforce a consistent import order

			// TypeScript-Specific Rules
			'@typescript-eslint/explicit-function-return-type': 'off', // Make return types optional
			'@typescript-eslint/no-explicit-any': 'warn', // Warn when `any` type is used
			'@typescript-eslint/no-unused-vars': ['error'], // Catch unused variables in TS

			// Promise Handling
			'promise/always-return': 'warn', // Ensure promises always return something
			'promise/catch-or-return': 'error', // Catch errors in promises

			// Security
			'security/detect-object-injection': 'warn', // Warn about object injections

			// Misc
			'no-var': 'error', // Disallow use of `var`
			'prefer-const': 'error', // Suggest using `const` whenever possible
			'arrow-body-style': ['error', 'as-needed'] // Enforce concise arrow functions
		}
	}
];
