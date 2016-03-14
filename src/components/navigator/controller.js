/**
 * Created by vst on 3/12/2016.
 */

"use strict";

var breadcrumbs = require('./services/breadcrumbs.js');
require('./services/fs.js');

var FolderController = function ($scope, $params, $fs)
{
	$scope.path = $params.path || '/';
	$scope.breadcrumbs = breadcrumbs.generate($scope.path);

	$fs.list($scope.path).then(function (entries) {
		$scope.entries = entries;
	});
};

FolderController.$inject = ['$scope', '$routeParams', '$fs'];

module.exports = FolderController;