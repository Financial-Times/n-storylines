module.exports = function addEditorialPicks (content, listedArticles) {

	work(content);

	content.children.forEach(work);

	content.children.forEach(child => {
		child.children.forEach(work);
	});

	return content;

	function work (x) {
		const replacements = listedArticles
			  .filter(article => article.year === x.name || article.month === x.name);

		const newRelevantArticles = x.relevantArticles
			.slice(0) // clone
			.sort((a, b) => a.weight - b.weight) // sort by ascending weight
			.slice(0, replacements.length) // remove non-editorial picks
			.concat(replacements) // add editorial picks
			.sort((a, b) => {
				// re-sort by time
				return a.year - b.year || a.month - b.month || a.day - b.day ;

			});

		x.relevantArticles = newRelevantArticles;
	}
}
