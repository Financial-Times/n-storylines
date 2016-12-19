const template = require('../templates/main.html');

function init () {
	let cutsTheMustard = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window);
	if (cutsTheMustard) {
		const initialData = window && window.FT && window.FT.storylineData;
		if (!initialData) return;

		const heatmapSegments = document.getElementsByClassName('n-storylines__heatmap-segment');
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
	} else {
		console.log('No Mustard Cut');
	}
}

module.exports = {
	init,
	decorate: require('./lib/decorate')
};
