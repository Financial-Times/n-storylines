const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = function yearDots (data) {
	data.children.forEach(year => {
		year['dot'] = [];
	});
	//adds dots and positions them on year segments
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
		month['dayDot'] = [];
	});
	//adds dots and positions them on months in year view
	for(let y = 0; y < data.relevantArticles.length; y++){
		let article = data.relevantArticles[y];
		for(let i = 0; i < data.children.length; i++) {
			let month = data.children[i];
			if(month.name === months[article.month]) {
				month['dot'].push({name: y+1, position: Math.ceil((100 / 30) * article.day)});
			}
		}
	}
//adds dots and positions them on months in individual month view
	data.children.forEach(month => {
		for(let y = 0; y < month.relevantArticles.length; y++){
			let article = month.relevantArticles[y]
			month['dayDot'].push({name: y+1, position: Math.ceil((100 / 30) * article.day)})
		}
	});
}
