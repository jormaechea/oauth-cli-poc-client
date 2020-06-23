'use strict';

const credentials = require('./credentials');

const { refreshTokens } = require('./helpers');

const hasRefreshToken = () => !!(credentials.refreshToken);

module.exports.execute = async () => {

	if(!hasRefreshToken(credentials))
		return false;

	const newTokens = await refreshTokens(credentials.refreshToken);

	if(!newTokens || !newTokens.access_token || !newTokens.id_token)
		return false;

	credentials.accessToken = newTokens.access_token;
	credentials.idToken = newTokens.id_token;

	return true;
};
