const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = function yearDots (data) {
	data.children.forEach(year => {
		year['dot'] = [];
	});

	for(let y = 0; y < data.relevantArticles.length; y++){
		let article = data.relevantArticles[y];
		for(let i = 0; i < data.children.length; i++) {
			let year = data.children[i];
			if( year.name === article.year) {
				year['dot'].push({name: y+1, position: Math.ceil((100 / 12) * article.month)});
			}
			monthDots(year);
		}
	}
	return data;
}


function monthDots (data) {
	data.children.forEach(month => {
		month['dot'] = [];
	});

	for(let y = 0; y < data.relevantArticles.length; y++){
		let article = data.relevantArticles[y];
		for(let i = 0; i < data.children.length; i++) {
			let month = data.children[i];
			if( month.name === months[article.month]) {
				month['dot'].push({name: y+1, position: Math.ceil((100 / 30) * article.day)});
			}
		}
	}
}
