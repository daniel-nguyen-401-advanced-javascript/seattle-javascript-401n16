//const net = require('net');
//const socket = new net.Socket();
const sioc = require('socket.io-client');

const faker = require('faker');

/* socket.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('connected to server');
});
*/

const socket = sioc.connect('http://localhost:3000/messages');

setInterval(() => {
    let message = faker.random.words();

    // we want to emit an event
    // socket.write(JSON.stringify({ event: 'shout', msg: message }));

    socket.emit('shout', message);
}, 2000);

socket.on('shout-heard', (payload) => {
    console.log('server heard shout', payload);
});

socket.on('room-secret', (payload) => {
    console.log('SECRET!!!!', payload);
});
