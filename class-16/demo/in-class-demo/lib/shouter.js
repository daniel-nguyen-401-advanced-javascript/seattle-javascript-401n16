const globalEmitter = require('./events.js');
const faker = require('faker');

// raise an event

setInterval(() => {
    let name = faker.name.firstName() + ' ' + faker.name.lastName();
    let message = faker.random.words();

    globalEmitter.emit('shout-in-forest', { name, message });
}, 2000);
