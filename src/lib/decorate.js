const addDots = require('./dotPosition');
const addAbbreviations = require('./abbreviate');
const addTimestamps = require('./timestamps');
const addEditorialPicks = require('./editorial-lists');

module.exports = function decorate (data, listedArticles) {
	const decoratedData = addTimestamps(addAbbreviations(addDots(data)));
	if (!listedArticles.length) {
		return decoratedData;
	} else {
		return addEditorialPicks(decoratedData, listedArticles);
	}
};
