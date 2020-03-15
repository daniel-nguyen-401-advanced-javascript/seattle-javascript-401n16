'use strict';

// import welcome
const messages = require('./messages.js');

describe('my first test suite', () => {
    it('check if welcome message function works', () => {
        expect(messages.welcome('Sonia')).toBe('Welcome Sonia!');
    });

    it('check if goodbye message function works', () => {
        expect(messages.goodbye('Sonia')).toBe('See ya later Sonia!');
    });
});
