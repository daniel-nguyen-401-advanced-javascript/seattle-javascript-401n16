//const net = require('net');
//const server = net.createServer();
const sio = require('socket.io');
const server = sio(3000);

/*
// net needs,  socket.io does not: 
let socketPool = [];

server.listen(3000, () => {
    console.log('server up and running on 3000');
});
*/

server.on('connection', (socket) => {
    //socketPool.push(socket);
    console.log('connected to socket', socket.id);

    /* 
        socket.on('data', (payload) => {
            console.log(JSON.parse(payload.toString()));
        }); 
    */
    socket.join('room-in-field');

    socket.on('whisper', (payload) => {
        console.log('whisper *', payload.toLowerCase(), '*');
        server.emit('whisper-heard', payload);
    });
});

// create the messages building (server)

const messagesServer = server.of('/messages');

messagesServer.on('connection', (socket) => {
    socket.join('messages-shouter-room');
    //socketPool.push(socket);
    console.log('This socket is in the messages building', socket.id);

    socket.on('shout', (payload) => {
        console.log('MESSAGES SHOUT', payload.toUpperCase(), '!');
        messagesServer.emit('shout-heard', payload);
        messagesServer
            .to('messages-shouter-room')
            .emit('room-secret', 'secret');
        //server.emit('shout-heard', payload);
    });
});
