Promise.all([
	fetch('../templates/main.html').then(res => res.text()),
	fetch('./vwdata.json').then(res => res.json()).then(opacity)
])
	.then(([source, initialData]) => {
		const template = Handlebars.compile(source);
		const component = document.querySelector('.container');
		const segments = document.getElementsByClassName('heatmap-segment');
		const backBtns = document.getElementsByClassName('back');

		setupInteraction(initialData);

		function setupInteraction (data) {
			backBtns[0].style.display = data === initialData ? 'none' : '';

			if (!data.children) return;

			for (let i = 0; i < segments.length; i++) {
				segments[i].addEventListener('click', () => {
					renderStoryline(data.children[i]);
					renderBackBtn(data);
				});
			}
		}

		function renderStoryline (data) {
			component.innerHTML = template(data);
			setupInteraction(data);
		}

		function renderBackBtn (data) {
			backBtns[0].addEventListener('click', () => {
				renderStoryline(data);
				renderBackBtn(initialData);
			});
		}
	});

function opacity (data) {
	// TODO: make legible and put elsewhere
	const yearlyTotals = data.children.map(x => x.total);
	const monthlyTotals = [].concat(...data.children.map(x => x.children.map(x => x.total))) // any month's opacity will be proportional to monthly totals across all years
	const max = x => x.sort((a, b) => a - b)[x.length - 1];
	const yearMax = max(yearlyTotals), monthMax = max(monthlyTotals);
	const addOpacity = (x, max) => Object.assign({}, x, { opacity: x.total / max });
	const newKids = data.children.map(year => addOpacity(year, yearMax));
	newKids.forEach(x => x.children = x.children.map(month => addOpacity(month, monthMax)));
	return Object.assign({}, data, { children: newKids });
}
