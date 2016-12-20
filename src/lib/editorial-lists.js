function addTimeProperties (article) {
	const publishedDate = new Date(article.publishedDate);
	const day = publishedDate.getDate(),
		  month = publishedDate.getMonth(),
		  year = publishedDate.getFullYear();
	return Object.assign({}, article, { day, month, year });
};

const isInTimeUnit = (article, timeUnit) => article.year === timeUnit || article.month === timeUnit;

function addKeyDevelopments (articles, keyDevelopments, timeUnit=false) {
	const replacements = keyDevelopments.map(addTimeProperties)
		  .filter(article => timeUnit ? isInTimeUnit(article, timeUnit) : true);

	return articles.slice(0) // clone
		.sort((a, b) => a.weight - b.weight) // sort by ascending weight
		.slice(replacements.length) // remove non-editorial picks
		.concat(replacements) // add editorial picks
		.sort((a, b) =>  a.year - b.year || a.month - b.month || a.day - b.day); // sort by time
};

module.exports = (originalContent, keyDevelopments) => {
	const allUpdates = {};
	allUpdates.relevantArticles = addKeyDevelopments(
		originalContent.relevantArticles,
		keyDevelopments
	);
	allUpdates.children = originalContent.children.map(originalYear => {
		const yearUpdates = {};
		yearUpdates.relevantArticles = addKeyDevelopments(
			originalYear.relevantArticles,
			keyDevelopments,
			originalYear.name
		);
		yearUpdates.children = originalYear.children.map(originalMonth => {
			const monthUpdates = {};
			monthUpdates.relevantArticles = addKeyDevelopments(
				originalMonth.relevantArticles,
				keyDevelopments,
				originalMonth.name
			);
			return Object.assign({}, originalMonth, monthUpdates);
		});
		return Object.assign({}, originalYear, yearUpdates);
	});
	return Object.assign({}, originalContent, allUpdates);
};
