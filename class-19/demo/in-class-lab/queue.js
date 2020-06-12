const io = require('socket.io')(3001);

let queue = {};

console.log('Message Queue Server up and running on 3001');

io.on('connection', (socket) => {
    console.log('Connected', socket.id);

    socket.on('delivered', (payload) => {
        // A delivery happened, put this message on the queue
        // check the vendor
        // check if we have an existing queue for that vendor
        // if so, add to queue
        // if not, create queue

        console.log('server hit delivered event');

        if (queue[payload.vendor]) {
            // check the value is an array

            queue[payload.vendor].push(payload.orderID);
            io.to(payload.vendor).emit('queue', queue[payload.vendor]);
        } // this vendor doesn't have a queue
        else {
            queue[payload.vendor] = [payload.orderID];
            io.to(payload.vendor).emit('queue', queue[payload.vendor]);
        }

        console.log('queue', queue);
    });

    socket.on('subscribe', (payload) => {
        socket.join(payload);
    });

    socket.on('getAll', (payload) => {
        socket.emit('queue', queue[payload]);
    });

    socket.on('received', (payload) => {
        if (queue[payload] && queue[payload].length) {
            queue[payload].shift();
            socket.emit('queue', queue[payload]);
        }
    });
});
