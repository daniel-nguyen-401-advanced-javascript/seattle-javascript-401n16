'use strict';

const mongoose = require('mongoose');
const dbUrl =
    'mongodb+srv://cf-sonia:seattle-js-401n16@class-03-database-lw31z.mongodb.net/app';
const FoodModel = require('./lib/models/food-model.js');

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
});

const dbOps = async () => {
    let newFoodData = {
        name: 'apple',
        calories: 100,
        type: 'fruit',
    };

    await FoodModel.create(newFoodData);
    //let record = await FoodModel.read('5e7c1ea441ea38559e8e8258');
    //console.log('found record', record);

    mongoose.disconnect();
};

dbOps();
