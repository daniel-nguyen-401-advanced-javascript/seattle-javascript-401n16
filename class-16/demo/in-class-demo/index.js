// assign a listener
// raise an event
// handle that event

const globalEmitter = require('./lib/events.js');
const handleWhisper = require('./lib/whisperHandler.js');
const handleShout = require('./lib/shoutHandlers.js');

// my event is 'shout-in-forest'

// assign a listener

globalEmitter.on('shout-in-forest', handleShout.handleShout02);

globalEmitter.on('shout-in-forest', handleShout.handleShout01);

globalEmitter.on('whisper-in-forest', handleWhisper);

require('./lib/shouter.js');
require('./lib/whisperer.js');
