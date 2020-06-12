// import the node event emitter class
const EventEmitter = require('events');

// make an instance of that class
const emitter = new EventEmitter();

// export a single instance for use across our application
module.exports = emitter;
