/**
 * Created by vstuk on 3/10/2016.
 */
var webpack = require("webpack");

module.exports = {
	entry: "./src/entry.js",
	output: {
		filename: "app.bundle.js",
		path: "./dist/build"
	},

	devtool: "eval",

	resolve: {
		alias: {
			app: __dirname + '/src/app.js',
			components: __dirname + '/src/components/'
		}
	},

	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: "jshint-loader",
				exclude: /node_modules/
			}
		],

		loaders: [
			{ test: /\.html$/, loader: "html" }
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
