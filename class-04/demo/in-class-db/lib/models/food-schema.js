'use strict';

const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    calories: { type: Number, required: true },
    type: {
        type: String,
        uppercase: true,
        enum: ['DAIRY', 'MEAT', 'FRUIT', 'VEGETABLE', 'OTHER'],
    },
});

// format the data BEFORE its saved to the database
foodSchema.pre('save', function() {
    console.log('attempting to save record:');
    console.log(this);
    console.log('-----');
});

foodSchema.post('save', function() {
    console.log('successfully saved!');
    console.log('-----');
});

foodSchema.post('deleteOne', function() {});

foodSchema.pre('deleteOne', function() {});

const foodModel = mongoose.model('foods', foodSchema);

module.exports = foodModel;
