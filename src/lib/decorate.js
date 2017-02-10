const addDots = require('./dotPosition');
const addAbbreviations = require('./abbreviate');
const addTimestamps = require('./timestamps');

module.exports = function decorate (data) {
	return addTimestamps(addAbbreviations(addDots(data)));
};
