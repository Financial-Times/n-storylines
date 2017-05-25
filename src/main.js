const template = require('../templates/main.html');

function init () {

	const initialData = window && window.FT && window.FT.storylineData;
	if (!initialData) return;

	const heatmapSegments = document.getElementsByClassName('n-storylines__heatmap-segment');
	const backBtns = document.getElementsByClassName('n-storylines__back-btn');

	setupInteraction(initialData);
	initialData.parent && setupBackBtn(initialData.parent);

	function setupInteraction (data) {
		const shouldHideBackButton = ((initialData.parent && data === initialData.parent) ||
			(!initialData.parent && data === initialData));
		if (shouldHideBackButton) backBtns[0].style.display = 'none';

		if (!data.children) return;

		for (let i = 0; i < heatmapSegments.length; i++) {
			if (data.children[i].relevantArticles.length > 0) {
				heatmapSegments[i].addEventListener('click', () => {
					renderStoryline(data.children[i]);
					setupBackBtn(data);
				});
				heatmapSegments[i].addEventListener('keyup', (e) => {
					// spacebar or enter triggers event too
					if (e.keyCode === 13 || e.keyCode === 23) {
						renderStoryline(data.children[i]);
						setupBackBtn(data);
					}
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
			if (initialData.parent) {
				setupBackBtn(initialData.parent);
			} else {
				setupBackBtn(initialData);
			}
		});
	}
}

module.exports = {
	init,
	decorate: require('./lib/decorate')
};
