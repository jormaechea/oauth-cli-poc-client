'use strict';

const request = require('request');

const credentials = require('../oauth/credentials');
const refreshToken = require('../oauth/refresh-token');

const makeRequest = ({ path, ...options }) => {
	return new Promise((resolve, reject) => {
		request({
			...options,
			json: true,
			url: `${process.env.API_BASE_URL}${path}`,
			auth: {
				bearer: credentials.accessToken
			}
		}, (error, response, body) => {

			if(error)
				return reject(error);

			if(response.statusCode !== 200) {
				const httpError = new Error(response.statusMessage);
				httpError.statusCode = response.statusCode;
				return reject(httpError);
			}

			resolve(body);
		});

	});
};

module.exports = async options => {
	try {
		const response = await makeRequest(options);
		return response;
	} catch(e) {

		if(e.statusCode === 401) {
			const refreshed = await refreshToken.execute();
			if(refreshed)
				return makeRequest(options);
		}

		throw e;
	}
};
