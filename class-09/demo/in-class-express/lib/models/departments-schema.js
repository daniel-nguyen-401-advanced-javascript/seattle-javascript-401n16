'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: 'String', required: true },
    manager: { type: 'String', required: true },
    phone: { type: 'String', required: true },
});

const model = mongoose.model('departments', schema);
module.exports = model;
