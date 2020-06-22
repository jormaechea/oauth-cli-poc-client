'use strict';

const querystring = require('querystring');
const open = require('open');
const jwt = require('jsonwebtoken');

const credentials = require('./credentials');

const server = require('./server');
const {
	getState,
	getChallenge,
	getVerifier,
	getTokens
} = require('./helpers');

const isLoggedIn = () => !!(credentials.accessToken && credentials.refreshToken && credentials.idToken);

const {
	CLIENT_ID: clientId,
	AUDIENCE: audience,
	REDIRECT_URI: redirectUri,
	SCOPE: scope,
	OAUTH_ENDPOINT: oauthEndpoint
} = process.env;

const state = getState();
const verifier = getVerifier();

const loginParams = {
	response_type: 'code',
	code_challenge: getChallenge(verifier),
	code_challenge_method: 'S256',
	client_id: clientId,
	audience,
	redirect_uri: redirectUri,
	scope,
	state
};

const loginUrl = `https://${oauthEndpoint}/authorize?${querystring.stringify(loginParams)}`;

module.exports.execute = () => {

	if(isLoggedIn(credentials)) {
		const tokenData = jwt.decode(credentials.idToken);
		console.log(`Welcome back ${tokenData.given_name || tokenData.name}!`);
		return true;
	}

	server.start();

	server.once('error', err => {
		console.error(`An error ocurred: ${err}`);
		server.stop();
		process.exit(1);
	});

	server.once('code-fetched', async ({ code, state: authState }) => {

		if(authState !== state)
			throw new Error('Wrong auth state');

		try {

			const tokens = await getTokens(code, verifier);

			const tokenData = jwt.decode(tokens.id_token);

			credentials.idToken = tokens.id_token;
			credentials.accessToken = tokens.access_token;
			credentials.refreshToken = tokens.refresh_token;

			console.log(`Welcome ${tokenData.given_name || tokenData.name}!`);

			server.close();

		} catch(err) {
			console.error(`An error ocurred: ${err}`);
			server.stop();
			process.exit(1);
		}

	});

	console.log(`Your browser should be opened automatically. If not, browse to this URL manually: ${loginUrl}`);
	console.log();

	open(loginUrl);
};
