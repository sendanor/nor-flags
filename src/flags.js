/** flags */

"use strict";

var ARRAY = require('nor-array');
var debug = require('nor-debug');
var is = require('nor-is');
var copy = require('nor-data').copy;

/** Convert string to uppercase */
function to_upper_case(m) {
	return m.toUpperCase();
}

/** Returns `true` if `x` is `true` */
function is_true(x) {
	return !!( x === true );
}

/** Flags constructor */
function Flags(opts) {
	var self = this;
	opts = opts || {};
	debug.assert(self).is('object');
	debug.assert(opts).is('object');
	opts = copy(opts);
	ARRAY(Object.keys(opts)).forEach(function(key) {
		self[key] = is_true(opts[key]);
	});
}

/** */
Flags.parse = function(o) {
	if(o instanceof Flags) {
		return o;
	}
	return new Flags(o);
};

/** */
Flags.prototype.merge = function(b) {
	var self = this;
	var a = self;
	debug.assert(a).is('object');
	debug.assert(b).is('object');
	b = Flags.parse(b);
	ARRAY(Object.keys(b)).forEach(function(key) {
		if(a[key] !== undefined) {
			a[key] = !!( is_true(a[key]) || is_true(b[key]) );
		} else {
			a[key] = is_true(b[key]);
		}
	});
	return a;
};

// Exports
module.exports = Flags;

/* EOF */
