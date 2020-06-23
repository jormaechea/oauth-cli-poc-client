'use strict';

const crypto = require('crypto');
const request = require('request');

const {
	CLIENT_ID: clientId,
	REDIRECT_URI: redirectUri,
	OAUTH_ENDPOINT: oauthEndpoint
} = process.env;

const base64URLEncode = str => str.toString('base64')
	.replace(/\+/g, '-')
	.replace(/\//g, '_')
	.replace(/=/g, '');

const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest();

module.exports.getVerifier = () => base64URLEncode(crypto.randomBytes(32));

module.exports.getChallenge = verifier => base64URLEncode(sha256(verifier));

module.exports.getState = () => crypto.randomBytes(64).toString('hex');

module.exports.getTokens = (code, verifier) => {
	return new Promise((resolve, reject) => {

		const options = {
			method: 'POST',
			url: `https://${oauthEndpoint}/oauth/token`,
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			form: {
				grant_type: 'authorization_code',
				client_id: clientId,
				code_verifier: verifier,
				code,
				redirect_uri: redirectUri
			}
		};

		request(options, (error, response, body) => {
			if(error)
				return reject(error);

			resolve(JSON.parse(body));
		});

	});
};

module.exports.refreshTokens = refreshToken => {
	return new Promise((resolve, reject) => {

		const options = {
			method: 'POST',
			url: `https://${oauthEndpoint}/oauth/token`,
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			form: {
				grant_type: 'refresh_token',
				client_id: clientId,
				refresh_token: refreshToken
			}
		};

		request(options, (error, response, body) => {
			if(error)
				return reject(error);

			resolve(JSON.parse(body));
		});

	});
};
