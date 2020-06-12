const io = require('socket.io')(3000);

io.on('connection', (socket) => {
    console.log('connected to', socket.id);
});

const cspsIO = io.of('/csps');

cspsIO.on('connection', (socket) => {
    console.log('csps connected to', socket.id);
    // socket joins a room = to its vendor type
    // listen to the pickup event and log out
    // driver gets sent the pickup event

    socket.on('join', (payload) => {
        socket.join(payload);
    });

    socket.on('pickup', (payload) => {
        console.log(payload);
        // driver should hear this information
        cspsIO.to('driver').emit('pickup', payload);
    });

    socket.on('delivered', (payload) => {
        cspsIO.to(payload.store).emit('delivered', payload);
    });
});
