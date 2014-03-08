/** flags */

"use strict";

var FlagValue = require('./flagvalue.js');

/** Convert string to uppercase */
function to_upper_case(m) {
	return m.toUpperCase();
}

var debug = require('nor-debug');
var is = require('nor-is');
var copy = require('nor-data').copy;

/** Flags constructor */
function Flags(opts) {
	var self = this;
	opts = opts || {};
	debug.assert(self).is('object');
	debug.assert(opts).is('object');
	opts = copy(opts);
	Object.keys(opts).forEach(function(key) {
		self[key] = FlagValue.parse(opts[key]);
	});
}

Flags.Value = FlagValue;

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
	Object.keys(b).forEach(function(key) {
		if(a[key]) {
			a[key] = Flags.Value.merge(a[key], b[key]);
		} else {
			a[key] = Flags.Value.parse(b[key]);
		}
	});
	return a;
};

// Exports
module.exports = Flags;

/* EOF */
