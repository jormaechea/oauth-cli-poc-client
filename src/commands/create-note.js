'use strict';

const call = require('../api/call');

module.exports.command = 'create-note [title] [content]';

module.exports.describe = 'Create a note';

module.exports.builder = yargs => yargs.demandOption(['title', 'content']);

module.exports.handler = async ({ title, content }) => {
	const note = await call({
		method: 'POST',
		path: '/notes',
		body: {
			title,
			content
		}
	});
	console.log(`Note created: ${note.id}`);
};
