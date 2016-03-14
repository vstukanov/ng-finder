/**
 * Created by vst on 3/14/2016.
 */

"use strict";

var app = require('app');
var path = require('./path.js');
var moment =  require('moment');
var filesize = require('filesize');

app.filter('join', function () {
	return path.join;
});

app.filter('url', function () {
	return function (fragment) {
		return '/nav/' + path.trim(fragment);
	};
});

app.filter('downloadUrl', function () {
	return function (fragment) {
		return '/api/' + path.trim(fragment);
	};
});

app.filter('timeago', function () {
	return function (date) {
		return moment(date).fromNow();
	};
});

app.filter('filesize', function () {
	return function (size) {
		return size ? filesize(size) : '-';
	};
});