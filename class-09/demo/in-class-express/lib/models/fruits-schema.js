'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name: { type: 'String', required: true },
        count: { type: 'Number', required: true },
        // a reference to a record in the department collection
        dept: { type: 'String' },
    },
    { toObject: { virtuals: true } },
    { toJSON: { virtuals: true } },
);

schema.virtual('fullDept', {
    // collection you're relating to
    ref: 'departments',
    // the local (in fruit schema) key-value
    // to use to search for a record in the other collection
    localField: 'dept',
    // the foreign (in department schema) key-value
    // to use to match a record to the local
    foreignField: 'name',
    // just give me one record from other collection
    justOne: true,
});

schema
    .virtual('fullString')
    .get(function () {
        return this.name + ' || ' + this.count + ' || ' + this.dept;
    })
    .set(function (str) {
        this.name = str;
        this.count = 0;
        this.dept = null;
    });

// Mongoose is creating a model
// that model has access to MongoDB operations
// like .save(), .find(), etc.
const model = mongoose.model('fruits', schema);
module.exports = model;
