'use strict';

class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }

    speak() {
        return this.name + ' makes a sound!';
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name, 'dog');
    }

    speak() {
        return this.name + ' barks!';
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name, 'cat');
    }

    speak() {
        return this.name + ' meows!';
    }
}

module.exports = { Dog, Cat };
