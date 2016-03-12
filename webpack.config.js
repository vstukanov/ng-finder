/**
 * Created by vstuk on 3/10/2016.
 */
var webpack = require("webpack");

module.exports = {
	entry: "./src/entry.js",
	output: {
		filename: "app.bundle.js",
		path: "./dist"
	},

	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: "jshint-loader",
				exclude: /node_modules/
			}
		]
	},

	jshint: {
		emitErrors: true,
		failOnHint: false
	},

	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			ng: "angular"
		})
	]
};
