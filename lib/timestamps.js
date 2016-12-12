module.exports = function timestamps (data) {
	const format = (year, month, day) => {
		const monthName = new Date(year, month)
			  .toLocaleDateString('en-GB', { month: 'short' })
			  .toUpperCase();
		return `${monthName} ${day}, ${year}`;
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
