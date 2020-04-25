'use strict';

describe('happy path', () => {
    // can add a dog to the shelter
    // can add a cat to the shelter
    // can dequeue a dog
    // can dequeue a cat
});

describe('edge cases', () => {
    // empty shelter enqueue
    // dequeue a cat, but the queue has 3 dogs at the front
    // dequeue a dog, but the queue has 3 cats at the front
});

describe('expected failures', () => {
    // dequeue on an empty shelter
    // dequeue without specifying cat or dog
});
