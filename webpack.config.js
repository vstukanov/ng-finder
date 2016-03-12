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

	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			ng: "angular"
		})
	]
};
