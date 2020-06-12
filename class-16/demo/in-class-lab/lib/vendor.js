const emitter = require('./events.js');
const faker = require('faker');
const handler = require('./handlers.js').vendorDeliveredHandler;

// attach handlers with listeners

emitter.on('delivered', handler);

// raise/emit events
setInterval(() => {
    let customer = {
        store: 'My Flower Shop',
        id: faker.random.uuid(),
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        address:
            faker.address.streetAddress() +
            ' ' +
            faker.address.secondaryAddress(),
    };

    emitter.emit('pickup', customer);
}, 5000);

// when there is no module.exports,
// a require will "paste" all this code in that spot
