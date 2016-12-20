function addTimeProperties (article) {
	const publishedDate = new Date(article.publishedDate);
	const day = publishedDate.getDate(),
		month = publishedDate.getMonth(),
		year = publishedDate.getFullYear();
	return Object.assign({}, article, { day, month, year });
};

const isInTimeUnit = (article, timeUnit) => {
	switch (timeUnit.type) {
		case 'year':
			return article.year === timeUnit.name;
		case 'month':
			const monthNumber = new Date(Date.parse(`${timeUnit.name} 1, 1970`)).getMonth();
			return article.month === monthNumber;
		default:
			return false;
	}
};

function addKeyDevelopments ({ originalArticles, keyDevelopments, timeUnit }) {
	const replacements = keyDevelopments.map(addTimeProperties)
		  .filter(article => timeUnit ? isInTimeUnit(article, timeUnit) : true);

	return originalArticles.slice(0) // clone
		.sort((a, b) => a.weight - b.weight) // sort by ascending weight
		.slice(replacements.length) // remove non-editorial picks
		.concat(replacements) // add editorial picks
		.sort((a, b) =>  a.year - b.year || a.month - b.month || a.day - b.day); // sort by time
};

module.exports = (originalContent, keyDevelopments) => {
	const allUpdates = {};
	allUpdates.relevantArticles = addKeyDevelopments({
		originalArticles: originalContent.relevantArticles,
		keyDevelopments
	});
	allUpdates.children = originalContent.children.map(originalYear => {
		const yearUpdates = {};
		yearUpdates.relevantArticles = addKeyDevelopments({
			originalArticles: originalYear.relevantArticles,
			keyDevelopments,
			timeUnit: { type: 'year', name: originalYear.name }
		});
		yearUpdates.children = originalYear.children.map(originalMonth => {
			const monthUpdates = {};
			monthUpdates.relevantArticles = addKeyDevelopments({
				originalArticles: originalMonth.relevantArticles,
				keyDevelopments,
				timeUnit: { type: 'month', name: originalMonth.name }
			});
			return Object.assign({}, originalMonth, monthUpdates);
		});
		return Object.assign({}, originalYear, yearUpdates);
	});
	return Object.assign({}, originalContent, allUpdates);
};
