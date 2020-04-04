'use strict';

const express = require('express');

// Define our server as "app"
// express() creates a server object with a lot of junk
const app = express();

const startServer = (port) => {
    // check is server already running?
    // check if port is valid

    // call callback anon function when server is successfully running
    app.listen(port, () => {
        console.log('Server is up and running on port', port);
    });
};

// browser is making a request to GET / === GET http://localhost:3000/
// currently, browser is not getting a response! Let's write one

// req = request object
// res = response object
app.get('/', (req, res) => {
    // receive req from client
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Params:', req.params);
    console.log('Query:', req.query);

    let homeHTML = '<div><h1>Homepage</h1>';

    if (req.query.name)
        homeHTML += '<h3>Welcome ' + req.query.name + '!</h3></div>';
    else homeHTML += '</div>';

    // return res to the client
    res.send(homeHTML);
});

module.exports = {
    server: app,
    start: startServer,
};
