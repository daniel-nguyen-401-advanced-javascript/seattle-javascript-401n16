'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    // _id does not need to be included in schema
    text: { required: true, type: String },
    category: { required: false, type: String },
});

const model = mongoose.model('notes', schema);

module.exports = model;
