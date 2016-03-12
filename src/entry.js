/**
 * Created by vst on 3/10/2016.
 */
"use strict";

require("app")
	.config(["$locationProvider", function (locationProvider) {
		locationProvider.html5Mode ({
			enabled: true,
			requireBase: false
		});
	}]);

// Components
require("components/folder");