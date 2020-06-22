'use strict';

const credentials = require('./credentials');

module.exports.execute = () => {

	credentials.idToken = undefined;
	credentials.accessToken = undefined;
	credentials.refreshToken = undefined;

	console.log('Bye!');
};
