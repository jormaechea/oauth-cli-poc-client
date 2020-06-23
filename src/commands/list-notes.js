'use strict';

const call = require('../api/call');

module.exports.command = 'list-notes';

module.exports.describe = 'List your notes';

module.exports.handler = async () => {
	const notes = await call({
		method: 'GET',
		path: '/notes'
	});
	console.log(notes);
};
