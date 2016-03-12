/**
 * Created by vst on 3/12/2016.
 */

"use strict";

var FolderController = function ($scope, $params, $http)
{
	$scope.params = $params;
	$scope.path = $params.path || '/';
	$scope.backPath = "..";

	$http.get("/api/" + $scope.path).then(function (res) {
		$scope.entries = res.data;
	});
};

FolderController.$inject = ['$scope', '$routeParams', '$http'];

module.exports = FolderController;