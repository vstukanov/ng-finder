/**
 * Created by vst on 3/14/2016.
 */

"use strict";

var app = require('app');

var FS = function($http)
{
	return {
		list: function (path)
		{
			return $http.get("/api/" + path).then(function (res) {
				return _.chain(res.data)
					.sortBy('type')
					.reverse()
					.groupBy('type')
					.values()
					.map(function (list) { return _.sortBy(list, 'name'); })
					.flatten(true)
					.value();
			});
		}
	};
};

FS.$inject = ['$http'];

module.exports = FS;

app.factory('$fs', FS);