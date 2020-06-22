'use strict';

const logout = require('../oauth/logout');

module.exports.command = 'logout';

module.exports.describe = 'Log out of the PoC';

module.exports.handler = async () => logout.execute();
