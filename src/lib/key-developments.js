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

	return originalArticles
		.slice(0) // clone
		.sort((a, b) => a.weight - b.weight) // sort by ascending weight
		.slice(replacements.length) // remove non-editorial picks
		.concat(replacements) // add editorial picks
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
