'use strict';

const Preferences = require('preferences');

const credentials = new Preferences('oauth-cli-poc.credentials', {}, {
	encrypt: false,
	format: 'json'
});

module.exports = credentials;
