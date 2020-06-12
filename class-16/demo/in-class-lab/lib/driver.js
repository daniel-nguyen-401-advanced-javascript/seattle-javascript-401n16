const emitter = require('./events.js');
const pickup = require('./handlers.js').driverPickupHandler;
const delivery = require('./handlers.js').driverDeliveredHandler;

// define handlers
const goOutForDelivery = (payload) => {
    emitter.emit('in-transit', payload);
    setTimeout(() => {
        emitter.emit('delivered', payload);
    }, 1000);
};

// attach handlers with listeners
emitter.on('pickup', pickup);
emitter.on('pickup', goOutForDelivery);
emitter.on('delivered', delivery);

// raise/emit events
// - emit in transit
// - emit delivered
