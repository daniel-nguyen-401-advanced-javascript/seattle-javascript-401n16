const io = require('socket.io-client');
const faker = require('faker');
const flowerSocket = io.connect('http://localhost:3000/csps');

const candySocket = io.connect('http://localhost:3000/csps');

flowerSocket.emit('join', 'flower-shop');
candySocket.emit('join', 'candy-shop');

flowerSocket.on('delivered', (payload) => {
    console.log('Flower: Thank you for delivering', payload.orderId);
});

candySocket.on('delivered', (payload) => {
    console.log('Candy: Thank you for delivering', payload.orderId);
});

// flower shop
setInterval(() => {
    let order = {
        store: 'flower-shop',
        orderId: faker.random.uuid(),
        customer: faker.name.firstName() + ' ' + faker.name.lastName(),
        address: faker.address.streetAddress(),
    };

    flowerSocket.emit('pickup', order);
}, 5000);

// candy shop
setTimeout(() => {
    setInterval(() => {
        let order = {
            store: 'candy-shop',
            orderId: faker.random.uuid(),
            customer: faker.name.firstName() + ' ' + faker.name.lastName(),
            address: faker.address.streetAddress(),
        };

        candySocket.emit('pickup', order);
    }, 5000);
}, 3000);
