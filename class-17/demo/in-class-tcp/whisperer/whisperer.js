// TCP Socket Connection
// wants to connect to a central server

const net = require('net');
const socket = net.Socket();
const faker = require('faker');

socket.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('Connected to TCP Socket Server!');
});

socket.on('data', (payload) => {
    let stringPayload = Buffer.from(payload).toString();
    let jsonPayload = {};

    try {
        jsonPayload = JSON.parse(stringPayload);
    } catch (e) {
        jsonPayload = {};
    }

    if (jsonPayload.event === 'whisper')
        console.log('I whisper **', jsonPayload.content, '**');
    else console.log(stringPayload);
});

setInterval(() => {
    let random = faker.internet.color();
    socket.write(JSON.stringify({ event: 'whisper', content: random }));
}, 4000);
