const addDots = require('./dotPosition');
const addAbbreviations = require('./abbreviate');
const addTimestamps = require('./timestamps');
const addKeyDevelopments = require('./editorial-lists');

module.exports = function decorate (data, keyDevelopments) {
	if (keyDevelopments.length) {
		const dataWithKeyDevelopements = addKeyDevelopments(data, keyDevelopments);
		return addTimestamps(addAbbreviations(addDots(dataWithKeyDevelopements)));
	} else {
		return addTimestamps(addAbbreviations(addDots(data)));
	}
};
