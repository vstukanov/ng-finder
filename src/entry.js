/**
 * Created by vst on 3/10/2016.
 */
"use strict";

require("app")
	.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
		$routeProvider.otherwise('/nav');

		$locationProvider.html5Mode ({
			enabled: true,
			requireBase: false
		});
	}]);

// Components
require("components/navigator");