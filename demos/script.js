Promise.all([
	fetch('../templates/main.html')
		.then(res => res.text()),
	fetch('./vwdata.json')
		.then(res => res.json()),
])
	.then(([source, data]) => {
		const yearTotals = data.children.map(x => x.total).sort((a, b) => a - b);
		const yearMax = yearTotals[yearTotals.length - 1];

		const monthTotals = data.children[1].children.map(x => x.total).sort((a, b) => a - b);
		const monthMax = monthTotals[monthTotals.length - 1];

		const addOpacity = (x, max) => Object.assign(x, { opacity: x.total / max });

		data.children.forEach((child, i) => {
			data.children = data.children.map(year => addOpacity(year, yearMax));
			child.children = child.children.map(month => addOpacity(month, monthMax));
		});

		return [source, data];
	})
	.then(([source, data]) => {
		const template = Handlebars.compile(source);

		Handlebars.registerHelper('abbreviate', (word) => {
			return typeof word === 'string' ? word.substring(0,3) : word;
		});

		Handlebars.registerHelper('timestamp', (day, month, year) => {
			let date = new Date(year, month);
			return date.toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" });
		});

		document.body.innerHTML = template(data);

		const script = document.createElement('script');
		script.src = '../main.js';
		document.head.appendChild(script);
});
