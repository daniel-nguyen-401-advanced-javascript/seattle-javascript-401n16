const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

let barOrders = [];

// what should we do on startup
// start by getting all the orders we care about
socket.emit('get-orders', 'bar');

socket.on('current-orders', (payload) => {
    console.log('current unhandled orders', payload);
    barOrders = payload;
});

setInterval(() => {
    if (barOrders.length > 0) socket.emit('did-bar-order', barOrders[0]);
}, 3000);
