//const net = require('net');
//const socket = new net.Socket();

const sioc = require('socket.io-client');
const socket = sioc.connect('http://localhost:3000');
/* 
socket.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('connected to server');
}); */

const faker = require('faker');

setInterval(() => {
    let message = faker.random.words();
    // socket.write(JSON.stringify({ event: 'whisper', msg: message }));
    socket.emit('whisper', message);
}, 3000);

socket.on('whisper-heard', (payload) => {
    console.log('server heard whisper', payload);
});

socket.on('shout-heard', (payload) => {
    console.log('server heard shout', payload);
});
socket.on('room-secret', (payload) => {
    console.log('SECRET!!!!', payload);
});
