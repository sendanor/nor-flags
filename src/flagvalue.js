/** flag values */

"use strict";

var debug = require('nor-debug');
var is = require('nor-is');
var copy = require('nor-data').copy;

/** Parse single flag value */
function FlagValue(value) {
	var self = this;
	debug.assert(value).is('boolean');
	self.value = value;
}

/** */
FlagValue.prototype.valueOf = function() {
	var self = this;
	return self.value;
};

/** */
FlagValue.prototype.toJSON = function() {
	return this.valueOf();
};

/** */
FlagValue.prototype.toString = function() {
	return '' + this.valueOf();
};

/** */
FlagValue.prototype.merge = function(b) {
	return FlagValue.merge(this, b);
};

/** */
FlagValue.parse = function(o) {
	if(o instanceof FlagValue) {
		return o;
	}
	return new FlagValue(o);
};

/** */
FlagValue.merge = function(a, b) {
	a = FlagValue.parse(a).valueOf();
	b = FlagValue.parse(b).valueOf();
	return FlagValue.parse( b || a );
};

// Exports
module.exports = FlagValue;

/* EOF */
