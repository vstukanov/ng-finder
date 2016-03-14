/**
 * Created by vstuk on 3/10/2016.
 */
var webpack = require("webpack");

module.exports = {
	entry: "./src/entry.js",
	output: {
		filename: "app.bundle.js",
		path: "./dist/build",
		publicPath: "/build/"
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
			{ test: /\.html$/, loader: "html" },
			{ test: /\.scss$/, loaders: ["style", "css", "sass"] },
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&minetype=application/font-woff"
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader"
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
			ng: "angular",
			_: "underscore"
		})
	]
};
