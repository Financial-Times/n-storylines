function addTimeProperties (article) {
	const publishedDate = new Date(article.publishedDate);
	const day = publishedDate.getDate(),
		month = publishedDate.getMonth(),
		year = publishedDate.getFullYear();
	return Object.assign({}, article, { day, month, year });
};

function addKeyDevelopments ({ originalArticles, keyDevelopments, timeUnit }) {
	const replacements = keyDevelopments
		  .map(addTimeProperties)
		  .filter(article => {
			  if (!timeUnit) return true;
			  return article.year === timeUnit.name || article.month === timeUnit.name;
		  });

	const replacementsIds = replacements.map(article => article.id);

	return originalArticles
		.slice(0) // clone
		.filter(article => replacementsIds.indexOf(article.id) === -1)
		.sort((a, b) => a.weight - b.weight) // sort by ascending weight
		.concat(replacements) // add editorial picks
		.slice(0 - originalArticles.length) // remove non-editorial picks
		.sort((a, b) =>  a.year - b.year || a.month - b.month || a.day - b.day); // sort by time
};


function getTimeUnit (name) {
	if (!name) return false;
	if (Number.isInteger(name)) return { type: 'year', name };
	return {
		type: 'month',
		name: new Date(Date.parse(`${name} 1, 1970`)).getMonth()
	};
};

module.exports = (originalContent, keyDevelopments) => {
	const mutateContent = content => {
		content.relevantArticles = addKeyDevelopments({
			originalArticles: content.relevantArticles,
			keyDevelopments,
			timeUnit: getTimeUnit(content.name)
		});
	};

	mutateContent(originalContent);
	originalContent.children.forEach(mutateContent);
	originalContent.children.forEach(child => {
		child.children.forEach(mutateContent);
	});

	return originalContent;
};
