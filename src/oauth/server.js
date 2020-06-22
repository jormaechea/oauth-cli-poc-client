'use strict';

const EventEmitter = require('events');
const express = require('express');

const app = express();
const port = 4000;

let server;

const eventEmitter = new EventEmitter();

module.exports.start = () => {

	app.get('/logged', (req, res) => {

		if(!req.query.code || !req.query.state) {
			res.status(400).send('Invalid request');
			return eventEmitter.emit('error', 'Missing auth code or state');
		}

		res.send('You\'re ready. You can close this browser now and return to the CLI');
		eventEmitter.emit('code-fetched', req.query);
	});

	server = app.listen(port);
};

module.exports.close = () => server.close();

module.exports.on = (...args) => eventEmitter.on(...args);

module.exports.once = (...args) => eventEmitter.once(...args);
