// assign a listener
// raise an event
// handle that event

const globalEmitter = require('./lib/events.js');

// my event is 'shout-in-forest'

// create handler
const handleShout01 = (payload) => {
    // handle that event
    console.log(payload);
};

const handleShout02 = (payload) => {
    console.log(payload.message.toUpperCase());
};

const handleWhisper01 = (payload) => {
    console.log('**', payload.message.toLowerCase(), '**');
};

// assign a listener

globalEmitter.on('shout-in-forest', handleShout02);

globalEmitter.on('shout-in-forest', handleShout01);

globalEmitter.on('whisper-in-forest', handleWhisper01);

require('./lib/shouter.js');
