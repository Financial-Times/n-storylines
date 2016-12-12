module.exports = function timestamps (data) {
	const format = (year, month, day) => {
		const opts = { month: 'short', day: 'numeric', year: 'numeric' };
		return new Date(year, month, day)
			.toLocaleDateString('en-US', opts)
			.toUpperCase();
	};

	const addTimestamp = article => {
		const timestamp = format(article.year, article.month, article.day);
		return Object.assign({}, article, { timestamp });
	};

	const clone = Object.assign({}, data);
	clone.relevantArticles = clone.relevantArticles.map(addTimestamp);
	clone.children.forEach(year => {
		year.relevantArticles = year.relevantArticles.map(addTimestamp);
		year.children.forEach(month => month.relevantArticles = month.relevantArticles.map(addTimestamp));
	});

	return clone;
};
