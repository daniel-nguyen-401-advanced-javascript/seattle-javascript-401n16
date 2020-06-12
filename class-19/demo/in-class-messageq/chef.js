const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

let chefOrders = [];

// what should we do on startup
// start by getting all the orders we care about
socket.emit('get-orders', 'chef');

socket.on('current-orders', (payload) => {
    console.log('current unhandled orders', payload);
    chefOrders = payload;
});

setInterval(() => {
    if (chefOrders.length > 0) socket.emit('did-chef-order', chefOrders[0]);
}, 5000);
