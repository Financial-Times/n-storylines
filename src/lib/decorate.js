const addDots = require('./dotPosition');
const addAbbreviations = require('./abbreviate');
const addTimestamps = require('./timestamps');
const addKeyDevelopments = require('./key-developments');

module.exports = function decorate (data, keyDevelopments) {
	if (keyDevelopments.length) {
		const dataWithKeyDevelopments = addKeyDevelopments(data, keyDevelopments);
		return addTimestamps(addAbbreviations(addDots(dataWithKeyDevelopments)));
	} else {
		return addTimestamps(addAbbreviations(addDots(data)));
	}
};
