// esoteric resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// internal modules
const generateSwagger = require('../docs/swagger.js');
const modelRouter = require('./routes/model-routes.js');

// server instantiation
const app = express();
const startServer = (port, mongodb) => {
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(mongodb, options);

    app.listen(port, () => {
        console.log('Server is up and running at port', port);
    });
};

generateSwagger(app);

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// this is going to run for EVERY REQUEST
// we really only want to use this when :model is in the path
app.use((req, res, next) => {
    console.log('Run Custom App Middleware (just a console log)');
    next();
});

// routes
/**
 * This route give us a standard Homepage message
 * @route GET /
 * @group Non-API
 * @returns {string} 200 - The string "Homepage"
 */
app.get('', (req, res, next) => {
    res.send('This is my homepage');
});

app.use('/api/v1', modelRouter);

module.exports = {
    server: app,
    start: startServer,
};
