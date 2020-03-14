'use strict';

// Here we import a module located in the
// file ./lib/hello.js, and we name it "hello"
const hello = require('./lib/hello.js');

// Let's try to print out what the variable
// "hello" actually stored. We should see
// from our console that it's a function
console.log(hello);

// Now lets try to use "hello" as if it was
// a function. That's because if you look
// in ./lib/hello.js you'll see that it is a
// function
hello('john');
