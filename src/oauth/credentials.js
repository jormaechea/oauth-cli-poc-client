'use strict';

const Preferences = require('preferences');

const credentials = new Preferences('oauth-cli-poc.credentials', {}, {
	encrypt: true,
	format: 'json'
});

module.exports = credentials;
