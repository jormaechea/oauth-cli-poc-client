'use strict';

require('dotenv').config();

// eslint-disable-next-line
require('yargs')
	.commandDir('./commands')
	.demandCommand()
	.help()
	.argv;
