/**
 * Created by vst on 3/14/2016.
 */

"use strict";

var app = require('app');
var path = require('../path.js');

module.exports = {
	generate: function (folderPath)
	{
		var base = '';
		folderPath = path.trim(path.normalize(folderPath));

		return _.map(_.filter(folderPath.split('/')),
			function (fragment, index, list) {
				return {
					name: fragment,
					path: base = (path.join(fragment, base)),
					isLast: index === (list.length - 1)
				};
			}
		);
	}
};

app.factory('breadcrumbs', function () { return module.exports; });