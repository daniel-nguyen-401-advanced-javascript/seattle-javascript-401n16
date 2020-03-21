'use strict';

const mongoose = require('mongoose');

// mongoose is our package
// mongoose exports a class Schema
// We are passing our "schema" object as a parameter
// to the Schema constructor
// This should return an instance of mongoose.Schema

const notesSchema = mongoose.Schema({
    note: { type: String, required: true },
    category: { type: Array },
});

// build a data model from this schema
// first param = name of the collection (plural)
const notesModel = mongoose.model('notes', notesSchema);

module.exports = notesModel;
