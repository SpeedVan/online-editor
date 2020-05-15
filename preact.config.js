// ... imports or other code up here ...
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

// these props are both optional
export default {
	// you can add preact-cli plugins here
	plugins: [],
	/**
	 * Function that mutates the original webpack config.
	 * Supports asynchronous changes when a promise is returned (or it's an async function).
	 *
	 * @param {object} config - original webpack config.
	 * @param {object} env - options passed to the CLI.
	 * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
	 * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
	 **/
	webpack(config, env, helpers, options) {
		config.plugins.push(new MonacoWebpackPlugin({
			languages: ["python", "javascript", "typescript", "html", "css"]
		}))
		/** you can change the config here **/
	},
};