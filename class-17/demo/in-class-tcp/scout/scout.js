// Our Scout is going to be the main listener to shouter and whisperer
// It will record all events
// and will console log that they happened
// and will "broadcast" the events to anything else connected to it

// TCP Socket Server
// receive connections

const net = require('net');
const server = net.createServer();

let socketPool = [];
let port = 3000;

server.listen(port, () => {
    console.log('Server is up and running on port', port);
});

server.on('connection', (socket) => {
    socketPool.push(socket);
    console.log('Received connection from', socket.address());
    socket.on('data', (payload) => {
        console.log(JSON.parse(Buffer.from(payload).toString()));

        // send something to complete pool
        for (let i = 0; i < socketPool.length; i++) {
            socket.write('server says hi!');
        }

        // send something to single socket
        if (socketPool.length > 0) socketPool[0].write("you're number one!");

        if (socketPool.length === 2) socketPool[1].write("you're number two!");
    });
});
