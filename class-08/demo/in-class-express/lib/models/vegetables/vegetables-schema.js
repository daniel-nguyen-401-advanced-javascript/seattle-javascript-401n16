'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: 'String', required: true },
    count: { type: 'Number', required: true },
});

// Mongoose is creating a model
// that model has access to MongoDB operations
// like .save(), .find(), etc.
const model = mongoose.model('vegetables', schema);
module.exports = model;
