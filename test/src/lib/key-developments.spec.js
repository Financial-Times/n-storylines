const expect = require('chai').expect;
const addEditorialPicks = require('../../../src/lib/key-developments');

describe('decorating storyline data with editiorial picks', () => {

	context('top level of data', () => {

		it('should update relevant articles and respect content\'s weight', () => {
			const result = addEditorialPicks({
				relevantArticles: [
					{id: 1, title: 'bantamweight', weight: 0.02},
					{id: 2, title: 'middleweight', weight: 0.27},
					{id: 3, title: 'heavyweight', weight: 0.59}
				],
				children: []
			}, [{id: 4, title: 'pick one'}, {id: 5, title: 'pick two'}]);

			expect(
				result.relevantArticles.map(artcl => artcl.title)
			).eql(
				['heavyweight', 'pick one', 'pick two']
			);
		});

		it('should dedupe content that is on the list and in the most popular', () => {
			const result = addEditorialPicks({
				relevantArticles: [
					{id: 1, title: 'bantamweight', weight: 0.02},
					{id: 2, title: 'middleweight', weight: 0.27},
					{id: 3, title: 'heavyweight', weight: 0.59}
				],
				children: []
			}, [{id: 1, title: 'bantamweight'}, {id: 5, title: 'pick two'}]);

			expect(
				result.relevantArticles.map(artcl => artcl.title)
			).eql(
				['heavyweight', 'bantamweight', 'pick two']
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
							{id: 1, title: 'bantamweight', weight: 0.02 },
							{id: 2, title: 'middleweight', weight: 0.27 },
							{id: 3, title: 'heavyweight', weight: 0.59, month: 11 }
						]
					}
				]
			}, [{ id: 4, title: 'pick one', publishedDate: new Date(2016, 3) }, { id: 5, title: 'pick two', publishedDate: new Date(2016, 0) }]);

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
								{id: 1, title: 'bantamweight', weight: 0.02, month: 0},
								{id: 2, title: 'middleweight', weight: 0.27, month: 0},
								{id: 3, title: 'heavyweight', weight: 0.59, month: 0}
							]
						}],
						relevantArticles: []
					}
				]
			}, [{ id: 4, title: 'pick one', publishedDate: new Date(2016, 0) }, { id: 5, title: 'pick two', publishedDate: new Date(2016, 0) }]);

			expect(
				result.children[0].children[0].relevantArticles.map(artcl => artcl.title)
			).eql(
				['heavyweight', 'pick one', 'pick two']
			);
		});

	});

});
