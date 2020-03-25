'use strict';

const minimist = require('minimist');

class Input {
    constructor(cliArgs) {
        // cliArgs >> {action, payload}

        this.command = {};

        let formatted = minimist(cliArgs);
        let keys = Object.keys(formatted);

        keys.forEach(key => {
            switch (key) {
                case 'a':
                case 'add':
                    this.command = {
                        action: 'add',
                        payload: formatted[key],
                        category: false,
                    };
                    break;
                case 'c':
                case 'category':
                    this.command.category =
                        typeof formatted[key] === 'string'
                            ? formatted[key]
                            : false;
                    break;
                case 'l':
                case 'list':
                    this.command = {
                        action: 'list',
                        payload:
                            typeof formatted[key] === 'string'
                                ? formatted[key]
                                : false,
                    };
                    break;
                case 'd':
                case 'delete':
                    this.command = {
                        action: 'delete',
                        payload:
                            typeof formatted[key] === 'string'
                                ? formatted[key]
                                : false,
                    };
                    break;
                default:
                    break;
            }
        });
    }
}

module.exports = Input;
