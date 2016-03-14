/**
 * Created by vst on 3/12/2016.
 */

"use strict";

require('font-awesome/css/font-awesome.css');
require("./style.scss");
require('./filters.js');

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

app.directive('targetBlank', function() {
	return {
		link: function (_, element, attrs) {
			if (attrs.ngHref.match(/^\/api/))
			{
				element.prop('target', '_blank');
			}
		}
	};
});