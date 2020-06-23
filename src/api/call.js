'use strict';

const request = require('request');

const credentials = require('../oauth/credentials');

module.exports = ({ path, ...options }) => {
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

			resolve(body);
		});

	});
};
