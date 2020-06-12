const express = require('express');
const generateSwagger = require('../docs/swagger.js');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fruitRouter = require('./routes/fruits-routes.js');
const vegetableRouter = require('./routes/vegetables-routes.js');

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

app.use(cors());
app.use(morgan('dev'));

/**
 * This route give us a standard Homepage message
 * @route GET /
 * @group Non-API
 * @returns {string} 200 - The string "Homepage"
 */
app.get('', (req, res, next) => {
    res.send('This is my homepage');
});

app.use('/fruits', fruitRouter);
app.use('/veggies', vegetableRouter);

module.exports = {
    server: app,
    start: startServer,
};
