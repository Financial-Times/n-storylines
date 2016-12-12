module.exports = function timestamps (data) {
	const format = (year, month, day) => {
		const monthName = new Date(year, month)
			  .toLocaleDateString('en-GB', { month: 'short' })
			  .toUpperCase();
		return `${monthName} ${day}, ${year}`;
	};

	const addTimestamp = timeUnit => {
		const timestamp = format(timeUnit.year, timeUnit.month, timeUnit.day);
		return Object.assign({}, timeUnit, { timestamp });
	};

	const clone = Object.assign({}, data);
	clone.relevantArticles = clone.relevantArticles.map(addTimestamp);
	clone.children.forEach(year => {
		year.relevantArticles = year.relevantArticles.map(addTimestamp);
		year.children.forEach(month => month.relevantArticles = month.relevantArticles.map(addTimestamp));
	});

	return clone;
};
