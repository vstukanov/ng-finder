/**
 * Created by vst on 3/12/2016.
 */

var express = require("express");
var path = require("path");
var server = express();
var distPath = path.join(__dirname, "../dist");
var historyApiFallback = require('express-history-api-fallback');
var basePath = path.join(__dirname, "../");
var fs = require("fs");
var Promise = require("promise");
var _ = require("underscore");

var wrap = function (method) {
	var restArgs = _.rest(arguments);
	return new Promise(function (accept, reject) {
		restArgs.push(function (err) {
			if (err) {
				reject({ method: method, err: err, args: restArgs });
			} else {
				accept.apply(this, _.rest(arguments));
			}
		});
		method.apply(this, restArgs);
	});
};

var save = function (cntx) {
	var names = _.rest(arguments);

	return function () {
		var keys = _.map(_.keys(arguments), function (index) {
			return names[index] || index;
		});
		var values = _.values(arguments);

		return _.extend(cntx, _.object(keys, values));
	};
};

var handler = function (req, res) {
	var reqPath = req.path.replace (/^\/api/, "");

	// Don't allow requests with dots
	if (/\/\.\.?/.test(reqPath))
	{
		return res.status(503).send();
	}

	var absPath = path.join (basePath, reqPath);
	var cntx = {};
	var _save = _.partial (save, cntx);

	wrap (fs.stat, absPath)
	// Remember stats
		.then (_save ('stat'))

		// Check access rights
		.then (wrap (fs.access, absPath, fs.R_OK))

		.then (function () {
			// Send file in case of file
			if (cntx.stat.isFile ()) {
				return wrap (_.bind (res.sendFile, res), absPath, {headers: {'ng-finder-file': true}})
				// Break the promise chain
					.then (null);
			}

			// Read dir
			if (cntx.stat.isDirectory ()) {
				return wrap (fs.readdir, absPath);
			}

			return Promise.reject();
		})

		.then (_save ('entries'))

		// Get fs stat for each entry
		.then (function () {
			var promises = _.map (cntx.entries, function (name) {
				return wrap (fs.stat, path.join (absPath, name));
			});

			return Promise.all (promises);
		})
		.then (function (stats) {
			stats = _.map (stats, function (stat, index) {
				var res = _.pick (stat, ["mode", "size", "mtime"]);
				res.name = cntx.entries[index];
				res.type = stat.isFile () ? "file" : "folder";

				return res;
			});

			res.json (stats).send ();
		})
		.catch(function () {
			res.status(503).send();
		});
};

server.use(express.static(distPath));

server.get('/api', handler);
server.get('/api/*', handler);

server.use(historyApiFallback('index.html', {
	root: distPath
}));

server.listen(8080, function () {
	console.log("Listen on 8080.");
});