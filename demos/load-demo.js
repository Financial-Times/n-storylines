const main = require('../main');
const template = require('../templates/main.html');
const decorate = require('../lib/decorate');

fetch('./N2FkZjRhMWUtZDZjNS00ZTQ0LTg1MTMtMjYyYzBlODkzYTQ2-UE4=.json')
	.then(res => res.json())
	.then(data => {
		const initialData = decorate(data);
		document.body.innerHTML = template(initialData);
		window.FT = { storylineData: initialData };
		main.init();
	});
