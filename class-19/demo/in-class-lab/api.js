const express = require('express');
const cors = require('cors');
const app = express();
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Homepage');
});

// create a route for a client ('customer') to
// write an order

app.post('/delivery/:vendor/:orderID', (req, res, next) => {
    let order = {
        vendor: req.params.vendor,
        orderID: req.params.orderID,
    };

    console.log('delivery', order);

    socket.emit('delivered', order);
    res.status(200);
    res.send(order);
});

app.listen(3000, () => {
    console.log('App is up and running on port 3000');
});
