Promise.all([
	fetch('../templates/main.html').then(res => res.text()),
	fetch('./vwdata.json').then(res => res.json()).then(opacity)
])
	.then(([source, initialData]) => {
		const template = Handlebars.compile(source);
		const component = document.querySelector('.n-storylines');
		const heatmapSegments = document.getElementsByClassName('n-storylines__heatmap-segment-colour');
		const backBtns = document.getElementsByClassName('n-storylines__back-btn');

		setupInteraction(initialData);

		function setupInteraction (data) {
			backBtns[0].style.display = data === initialData ? 'none' : '';
			if (!data.children) return;

			for (let i = 0; i < heatmapSegments.length; i++) {
				heatmapSegments[i].addEventListener('click', () => {
					renderStoryline(data.children[i]);
					setupBackBtn(data);
				});
			}
		}

		function renderStoryline (data) {
			component.innerHTML = template(data);
			setupInteraction(data);
		}

		function setupBackBtn (data) {
			backBtns[0].addEventListener('click', () => {
				renderStoryline(data);
				setupBackBtn(initialData);
			});
		}
	});

function opacity (data) {
	const yearlyTotals = data.children.map(x => x.total);
	const monthlyTotals = [].concat(
		...data.children.map(x => x.children.map(x => x.total))
	);

	const addOpacity = (element, range) => {
		const opacity = element.total / Math.max(...range);
		return Object.assign({}, element, { opacity });
	};

	const opaqueChildren = data.children.map(year => {
		const result = addOpacity(year, yearlyTotals);
		result.children = year.children.map(month => addOpacity(month, monthlyTotals));
		return result;
	});

	return Object.assign({}, data, { children: opaqueChildren });
}
