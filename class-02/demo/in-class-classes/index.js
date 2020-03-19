// I want to be able to create cats in a shelter
// Maybe some shelter have other animals that aren't cats, they should be able to add
// those as well

'use strict';

const Animal = require('./Animal.js');
const Cat = require('./Cat.js');

let watson = new Animal('Watson');
let henry = new Animal('Henry');
let kitto = new Cat('Kitto', 4, 'orange', 4);

watson.speak();
kitto.speak();
kitto.jump();

//watson.jump();
