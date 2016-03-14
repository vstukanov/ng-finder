/**
 * Created by vst on 3/12/2016.
 */

"use strict";

require('font-awesome/css/font-awesome.css');
require("./style.scss");

var app = require('app');
require('./filters.js');

var routeHandler = {
	template: require("./template.html"),
	controller: require("./controller.js")
};

app.config(["$routeProvider", function (routeProvider) {
	routeProvider
		.when("/nav", routeHandler)
		.when("/nav/:path*", routeHandler);
}]);