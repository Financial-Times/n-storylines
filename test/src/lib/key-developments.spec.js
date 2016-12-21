const expect = require('chai').expect;
const addEditorialPicks = require('../../../src/lib/key-developments');

describe('decorating storyline data with editiorial picks', () => {

	context('top level of data', () => {

		it('should update relevant articles and respect content\'s weight', () => {
			const result = addEditorialPicks({
				relevantArticles: [
					{title: 'bantamweight', weight: 0.02},
					{title: 'middleweight', weight: 0.27},
					{title: 'heavyweight', weight: 0.59}
				],
				children: []
			}, [{title: 'pick one'}, {title: 'pick two'}]);

			expect(
				result.relevantArticles.map(artcl => artcl.title)
			).eql(
				['heavyweight', 'pick one', 'pick two']
			);
		});

	});

	context('one level down', () => {

		it('should update relevant articles and respect content\'s weight', () => {
			const result = addEditorialPicks({
				relevantArticles: [],
				children: [
					{
						name: 2016,
						children: [],
						relevantArticles: [
							{title: 'bantamweight', weight: 0.02 },
							{title: 'middleweight', weight: 0.27 },
							{title: 'heavyweight', weight: 0.59, month: 11 }
						]
					}
				]
			}, [{ title: 'pick one', publishedDate: new Date(2016, 3) }, { title: 'pick two', publishedDate: new Date(2016, 0) }]);

			expect(
				result.children[0].relevantArticles.map(artcl => artcl.title)
			).eql(
				['pick two', 'pick one', 'heavyweight']
			);
		});

	});

	context('two levels down', () => {

		it('should update relevant articles and respect content\'s weight', () => {
			const result = addEditorialPicks({
				relevantArticles: [],
				children: [
					{
						name: 2016,
						children: [{
							name: 'January',
							relevantArticles: [
								{title: 'bantamweight', weight: 0.02, month: 0},
								{title: 'middleweight', weight: 0.27, month: 0},
								{title: 'heavyweight', weight: 0.59, month: 0}
							]
						}],
						relevantArticles: []
					}
				]
			}, [{ title: 'pick one', publishedDate: new Date(2016, 0) }, { title: 'pick two', publishedDate: new Date(2016, 0) }]);

			expect(
				result.children[0].children[0].relevantArticles.map(artcl => artcl.title)
			).eql(
				['heavyweight', 'pick one', 'pick two']
			);
		});

	});

});
