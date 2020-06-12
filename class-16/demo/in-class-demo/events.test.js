const globalEmitter = require('./lib/events.js');
const whisperHandler = require('./lib/whisperHandler.js');
const shoutHandlers = require('./lib/shoutHandlers.js');

let consoleSpy = jest.spyOn(console, 'log');

describe('test the handler function independently', () => {
    it('whisperHandler works', () => {
        consoleSpy.mockClear();

        let payload = {
            name: 'Sarah Smalls',
            message: 'Whisper Whisper',
        };

        expect(whisperHandler(payload)).toBe(true);
        expect(consoleSpy).toHaveBeenCalledWith(
            'Sarah Smalls',
            'whispers **',
            'whisper whisper',
            '**',
        );
    });
});

describe('test handler by emitting events', () => {
    it('calls handler on shout', () => {
        consoleSpy.mockClear();

        let payload = {
            name: 'Billy Biggs',
            message: 'Shout shout!',
        };

        globalEmitter.on('shout-in-forest', shoutHandlers.handleShout01);
        globalEmitter.emit('shout-in-forest', payload);
        expect(consoleSpy).toHaveBeenCalledWith(payload);
    });
});
