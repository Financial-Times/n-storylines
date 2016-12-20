const expect = require('chai').expect;
const addEditorialPicks = require('../../../src/lib/editorial-lists');

describe('decorating storyline data with editiorial picks', () => {
	it('happens', () => {
		const undecorated = require('./fixtures/storyline-data-no-editors-picks');
		const picks = [
			{
				year: 2016,
				month: 0,
				day: 0,
				weight: 0
			},
			{
				year: 2016,
				month: 0,
				day: 0,
				weight: 0
			},
			{
				year: 2016,
				month: 0,
				day: 0,
				weight: 0
			}
		];
		const decorated = addEditorialPicks(undecorated, picks);
		expect(decorated).not.eql(undecorated);
	});
});
