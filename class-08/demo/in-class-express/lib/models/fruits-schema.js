'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: 'String', required: true },
    count: { type: 'Number', required: true },
});

const model = mongoose.model('fruits', schema);
module.exports = model;
