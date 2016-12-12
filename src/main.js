const template = require('../templates/main.html');

function init () {
	const initialData = window && window.FT && window.FT.storylineData;
	if (!initialData) return;

	const component = document.querySelector('.n-storylines');
	const heatmapSegments = document.getElementsByClassName('n-storylines__heatmap-segment-colour');
	const backBtns = document.getElementsByClassName('n-storylines__back-btn');

	setupInteraction(initialData);

	function setupInteraction (data) {
		backBtns[0].style.display = data === initialData ? 'none' : '';
		if (!data.children) return;

		for (let i = 0; i < heatmapSegments.length; i++) {
			if (data.children[i].relevantArticles.length > 0) {
				heatmapSegments[i].addEventListener('click', () => {
					renderStoryline(data.children[i]);
					setupBackBtn(data);
				});
			} else {
				let heatmapSegmentsNames = document.querySelectorAll('.n-storylines__heatmap-segment-name');
				heatmapSegmentsNames[i].classList.add('no-articles');
			}
		}
	}

	function renderStoryline(data) {
		const component = document.querySelector('.n-storylines');
		component.parentNode.innerHTML = template(data);
		setupInteraction(data);
	}

	function setupBackBtn (data) {
		backBtns[0].addEventListener('click', () => {
			renderStoryline(data);
			setupBackBtn(initialData);
		});
	}
}

module.exports = {
	init,
	decorate: require('./lib/decorate')
};
