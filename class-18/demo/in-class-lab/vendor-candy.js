const io = require('socket.io-client');
const faker = require('faker');

const candySocket = io.connect('http://localhost:3000/csps');

candySocket.emit('join', 'candy-shop');

candySocket.on('delivered', (payload) => {
    console.log('Candy: Thank you for delivering', payload.orderId);
});

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
