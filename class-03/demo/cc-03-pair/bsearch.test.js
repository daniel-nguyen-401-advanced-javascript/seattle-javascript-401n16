const bsearch = require('./bsearch.js');

let testArrayA = [4, 8, 15, 16, 23, 42];
let testArrayB = [11, 22, 33, 44, 55, 66, 77];
let testArrayC = [];
let testArrayD = [1];

describe('happy path works', () => {
    it('with standard array', () => {
        expect(bsearch(testArrayA, 15)).toBe(2);
    });

    it('with alt standard array', () => {
        expect(bsearch(testArrayB, 44)).toBe(3);
    });

    it('with large array', () => {
        let largeArray = [];

        for (let i = 0; i < 10000000000; i++) largeArray.push(i);
        expect(bsearch(largeArray, 44)).toBe(44 - 1);
    });
});

describe('edge cases work', () => {
    it('when array is empty', () => {
        expect(bsearch(testArrayC, 1)).toBe(-1);
    });

    it('when array has only one item', () => {
        expect(bsearch(testArrayC, 1)).toBe(0);
    });

    it('when array has only one item', () => {
        expect(bsearch(testArrayC, 2)).toBe(-1);
    });
});

describe('expected failures fail', () => {
    it('throws error when not given an array', () => {
        expect(bsearch('blah', 'blah')).toThrow();
    });
});
