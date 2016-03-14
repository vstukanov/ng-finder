/**
 * Created by vst on 3/14/2016.
 */

"use strict";

/**
 * Trim path slashes
 * @param {string} path
 * @returns {string}
 */
exports.trim = function (path)
{
	return path.replace(/^\/|\/$/g, '');
};

/**
 * Remove extra slash characters in path
 * @param {string} path
 * @returns {string} Trimmed path
 */
exports.normalize = function (path)
{
	return path.replace(/\/{2,}/g, '/');
};

/**
 * Add `fragment` to `folderPath`. Proper handling two dots in fragment.
 * @param {string} fragment
 * @param {string} folderPath
 * @returns {string} Joined path
 */
exports.join = function (fragment, folderPath)
{
	var res = '';
	if (fragment == '..') {
		var parts = folderPath.split ('/');
		// remove head
		parts.pop ();

		res += parts.join ('/');
	} else {
		res += folderPath + '/' + fragment;
	}

	return exports.normalize(res);
};
