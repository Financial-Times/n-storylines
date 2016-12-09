module.exports = function addAbbreviations (data) {
	const abbreviateMonth = month => {
		return Object.assign({}, month, { abbrev: month.name.slice(0, 3) });
	};

	const clone = Object.assign({}, data);

	clone.children.forEach(year => {
		year.children = year.children.map(abbreviateMonth);
	});

	return clone;
};
