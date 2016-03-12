/**
 * Created by vst on 3/12/2016.
 */

"use strict";

var app = require('app');

var routeHandler = {
	template: require("./template.html"),
	controller: require("./controller.js")
};

app.config(["$routeProvider", function (routeProvider) {
	routeProvider
		.when("/nav", routeHandler)
		.when("/nav/:path*", routeHandler);
}]);

app.filter('navigate', function () {
	return function (path, base) {
		var res;
		if (path == '..') {
			var parts = base.split ('/');
			// remove head
			parts.pop ();

			res = '/nav/' + parts.join ('/');
		} else {
			res = '/nav/' + base + '/' + path;
		}

		return res.replace(/\/{2,}/g, '/');
	};
});