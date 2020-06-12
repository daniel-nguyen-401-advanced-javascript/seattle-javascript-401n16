const emitter = require('./lib/events.js');
const pickup = require('./lib/handlers.js').pickupOrderLogger;
const inTransit = require('./lib/handlers.js').inTransitOrderLogger;
const delivered = require('./lib/handlers.js').deliveredOrderLogger;

// define handlers

// attach handlers with listeners
emitter.on('pickup', pickup);

require('./lib/driver.js');
require('./lib/vendor.js');

emitter.on('in-transit', inTransit);
emitter.on('delivered', delivered);

// raise/emit events
