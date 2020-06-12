'use strict';

// created a Data Type Animal
// properties: name, state, requests
// methods/functions: speak, sleep, pet, addRequest

class Animal {
    //constructor function
    constructor(name) {
        // build the Animal with all of its initial values
        this.name = name;
        // is it adopted or not (init is unadopted)
        this.state = 'unadopted';
        // how many people have requested to adopt (init is 0)
        this.requests = 0;
    }

    speak() {
        console.log(this.name, 'says hi to you!');
    }

    sleep() {
        console.log(this.name, 'is sleeping soundly.');
    }

    pet() {
        console.log('You give', this.name, 'a nice pet.');
    }

    addRequest() {
        this.requests++;
        console.log(this.name, 'has', this.requests, 'requests for adoption!');
    }
}

module.exports = Animal;
