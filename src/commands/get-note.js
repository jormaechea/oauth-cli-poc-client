'use strict';

const call = require('../api/call');

module.exports.command = 'get-note [id]';

module.exports.describe = 'Get a note';

module.exports.builder = yargs => yargs.demandOption(['id']);

module.exports.handler = async ({ id }) => {
	const note = await call({
		method: 'GET',
		path: `/notes/${id}`
	});

	if(!note)
		console.log(`Sorry, note ${id} doesn't exist.`);
	else
		console.log(note);
};
