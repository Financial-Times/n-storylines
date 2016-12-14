const expect = require('chai').expect;
const addEditorialPicks = require('../../../src/lib/editorial-lists');

describe('decorating storyline data with editiorial picks', () => {
	it('happens', () => {
		const undecorated = require('./fixtures/storyline-data-no-editors-picks');
		const decorated = addEditorialPicks(undecorated);
		expect(decorated).not.eql(undecorated);
	});
});
