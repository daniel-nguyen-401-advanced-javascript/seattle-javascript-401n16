// array shift

function arrayShift(currentArray, newValue) {
    // do stuff
    return newArray;
}

// tests

// Happy Path
let goodInputArray = [2, 7, 6, 8];
let goodInputValue = 5;

let expectedGoodResult = [2, 7, 5, 6, 8];

expect(arrayShift(goodInputArray, goodInputValue)).toBe(expectedGoodResult);

// Expected Failure
let badInputArrayA = 3;
let badInputArrayB = null;
let badInputArrayC = []; // may or may not be bad input
let badInputValueA = 'test';
let badInputValueB = -1;

expect(arrayShift(goodInputArray, badInputValueA)).toThrow();

expect(arrayShift(badInputArrayA, goodInputValue)).toThrow();

expect(arrayShift(badInputArrayA, badInputValueA)).toThrow();

// Edge Case
// Input that might trip you up
let edgeInputArrayA = [1];
let edgeInputArrayB = [1, 2, 3, 4, 5, 6, 7, 8];
let edgeInputArrayC = [1, 3, 2];

let edgeInputValueA = 0;
let edgeInputValueB = 2;
