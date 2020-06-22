'use strict';

const login = require('../oauth/login');

module.exports.command = 'login';

module.exports.describe = 'Log into the PoC';

module.exports.handler = async () => login.execute();
