/**
 * Created by vst on 3/14/2016.
 */

"use strict";

var app = require('app');

var FS = function($http, url, downloadUrl, join)
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
					.map(function (entry) {
						var filter = (entry.type == 'folder') ? url : downloadUrl;
						entry.path = filter(join(entry.name, path));
						return entry;
					})
					.value();
			});
		}
	};
};

FS.$inject = [
	'$http',
	'urlFilter',
	'downloadUrlFilter',
	'joinFilter'
];

module.exports = FS;

app.factory('$fs', FS);