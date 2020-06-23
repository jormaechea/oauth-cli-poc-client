'use strict';

const call = require('../api/call');

module.exports.command = 'delete-note [id]';

module.exports.describe = 'Delete a note';

module.exports.builder = yargs => yargs.demandOption(['id']);

module.exports.handler = async ({ id }) => {
	const note = await call({
		method: 'DELETE',
		path: `/notes/${id}`
	});
	console.log(`Note ${note.id} deleted.`);
};
