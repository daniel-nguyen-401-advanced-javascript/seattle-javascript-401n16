const net = require('net');
const server = net.createServer();

server.listen(3000, () => {
    console.log('server up and running on 3000');
});

// create "socket pool" < all the connected sockets

let socketPool = [];

// listen to connection events, and do something with that
// socket that is trying to connect to us

const logger = (payload) => {
    let parsed = JSON.parse(payload.toString());
    //console.log('got', JSON.parse(payload.toString()));

    for (let i = 0; i < socketPool.length; i++) {
        let socket = socketPool[i];
        socket.write(payload);
    }

    if (parsed.event === 'pickup') {
        console.log('pickup');
        console.log('- Time:', new Date());
        console.log('- Store:', parsed.order.store);
        console.log('- OrderID:', parsed.order.id);
        console.log('- Customer:', parsed.order.name);
        console.log('- Address:', parsed.order.address);
    }

    if (parsed.event === 'in-transit')
        console.log('in-transit order', parsed.order.id);

    if (parsed.event === 'delivered')
        console.log('delivered order', parsed.order.id);
};

server.on('connection', (socket) => {
    console.log('socket connected to me');
    socketPool.push(socket);
    socket.on('data', logger);
});
