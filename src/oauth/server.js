'use strict';

const EventEmitter = require('events');
const express = require('express');
const jwt = require('jsonwebtoken');

const { getTokens } = require('./helpers');

const app = express();
const port = 4000;

let server;

const eventEmitter = new EventEmitter();

module.exports.start = (state, verifier, credentials) => {

	app.get('/logged', async (req, res) => {

		if(!req.query.code || !req.query.state) {
			res.status(400).send('Invalid request');
			return eventEmitter.emit('error', 'Missing auth code or state');
		}

		if(req.query.state !== state) {
			res.status(400).send('Invalid request');
			return eventEmitter.emit('error', 'Wrong auth state');
		}

		try {

			const tokens = await getTokens(req.query.code, verifier);

			const tokenData = jwt.decode(tokens.id_token);

			credentials.idToken = tokens.id_token;
			credentials.accessToken = tokens.access_token;
			credentials.refreshToken = tokens.refresh_token;

			console.log(`Welcome ${tokenData.given_name || tokenData.name}!`);

			res.send('You\'re ready. You can close this browser now and return to the CLI');
			server.close();

			eventEmitter.emit('logged', tokenData);

		} catch(err) {
			return eventEmitter.emit('error', err);
		}
	});

	server = app.listen(port);
};

module.exports.close = () => server.close();

module.exports.on = (...args) => eventEmitter.on(...args);

module.exports.once = (...args) => eventEmitter.once(...args);
