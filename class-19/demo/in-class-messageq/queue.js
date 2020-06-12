const io = require('socket.io')(3001);

let queue = {
    bar: [],
    chef: [],
};

io.on('connection', (socket) => {
    console.log('connected to', socket.id);

    socket.on('order-created', (payload) => {
        if (payload.type === 'drink') {
            queue.bar.push(payload.number);
            io.to('bar').emit('current-orders', queue.bar);
        } else if (payload.type === 'food') {
            queue.chef.push(payload.number);
            io.to('chef').emit('current-orders', queue.chef);
        }
    });

    socket.on('get-orders', (payload) => {
        if (payload === 'bar') {
            socket.join('bar');
            socket.emit('current-orders', queue.bar);
        } else if (payload === 'chef') {
            socket.join('chef');
            socket.emit('current-orders', queue.chef);
        }
    });

    // figure out is this from chef or bar
    socket.on('did-chef-order', (payload) => {
        // delete the item from the queue
        queue.chef.shift();
        io.to('chef').emit('current-orders', queue.chef);
    });

    // figure out is this from chef or bar
    socket.on('did-bar-order', (payload) => {
        // delete the item from the queue
        queue.bar.shift();
        io.to('bar').emit('current-orders', queue.bar);
    });
});
