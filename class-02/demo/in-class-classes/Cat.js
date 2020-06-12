'use strict';

// created a Data Type Cat
// properties: name, state, requests
// methods/functions: speak, sleep, pet, addRequest
const Animal = require('./Animal.js');

class Cat extends Animal {
    //constructor function
    constructor(name, age, furColor, jumpHeight) {
        // super = constructor function of parent that this
        // class inherits from (in this case, Animal)
        super(name);
        // build the Animal with all of its initial values
        this.age = age;
        this.fur = furColor;
        this.jumpHeight = jumpHeight;
    }

    // this.speak()
    speak() {
        try {
            console.log(this.name, 'meows to you!');
        } catch (err) {
            console.log('caught error', err);
        }
    }

    // this.jump()
    jump() {
        console.log(this.name, 'jumps', this.jumpHeight, 'ft high!');
    }
}

module.exports = Cat;
