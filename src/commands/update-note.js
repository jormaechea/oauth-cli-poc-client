'use strict';

const call = require('../api/call');

module.exports.command = 'update-note [id] [title] [content]';

module.exports.describe = 'Update a note';

module.exports.builder = yargs => yargs.demandOption(['id', 'title', 'content']);

module.exports.handler = async ({ id, title, content }) => {
	const note = await call({
		method: 'PUT',
		path: `/notes/${id}`,
		body: {
			title,
			content
		}
	});
	console.log(note);
};
