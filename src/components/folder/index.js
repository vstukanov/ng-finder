/**
 * Created by vst on 3/12/2016.
 */

"use strict";

var app = require('app');

app.config(["$routeProvider", function (routeProvider) {
	routeProvider
		.when("/f/:path", {
			template: require("./template.html"),
			controller: require("./controller.js")
		});
}]);