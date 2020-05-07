const globalEmitter = require('./events.js');
const faker = require('faker');

// raise an event

setInterval(() => {
    let name = faker.name.firstName() + ' ' + faker.name.lastName();
    let message = faker.random.word();

    globalEmitter.emit('whisper-in-forest', { name, message });
}, 5000);
