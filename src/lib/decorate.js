const addDots = require('./dotPosition');
const addAbbreviations = require('./abbreviate');
const addTimestamps = require('./timestamps');
const addKeyDevelopments = require('./key-developments');

module.exports = function decorate (data, keyDevelopments) {
	if (keyDevelopments.length) addKeyDevelopments(data, keyDevelopments);
	return addTimestamps(addAbbreviations(addDots(data)));
};
