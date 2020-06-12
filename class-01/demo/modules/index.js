'use strict';

// import some contents from somewhere
const compare = require('./compare.js');
const math = require('./math.js');

console.log('Hello There!');

if (compare(6, 3)) console.log(math.add(6, 3));
else console.log(math.subtract(6, 3));
