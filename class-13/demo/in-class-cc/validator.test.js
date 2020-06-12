const validator = require('./validator.js');

describe('happy path', () => {
    it('{} > true', () => {
        expect(validator('{}')).toBe(true);
    });

    it('{}(){} > true', () => {
        expect(validator('{}(){}')).toBe(true);
    });

    it('()[[Extra Characters]] > true', () => {
        expect(validator('()[[Extra Characters]]')).toBe(true);
    });

    it('(){}[[]] > true', () => {
        expect(validator('(){}[[]]')).toBe(true);
    });

    it('{}{Code}[Fellows](()) > true', () => {
        expect(validator('{}{Code}[Fellows](())')).toBe(true);
    });
});

describe('expected failures', () => {
    it('[({}] > false', () => {
        expect(validator('[({}]')).toBe(false);
    });

    it('(]( > false', () => {
        expect(validator('(](')).toBe(false);
    });

    it('{(}) > false', () => {
        expect(validator('{(})')).toBe(false);
    });
});

describe('edge cases', () => {
    it('{ > false', () => {
        expect(validator('{')).toBe(false);
    });

    it(') > false', () => {
        expect(validator(')')).toBe(false);
    });

    it('[} > false', () => {
        expect(validator('[}')).toBe(false);
    });

    it('blah > true', () => {
        expect(validator('blah')).toBe(true);
    });

    it(' "" > true', () => {
        expect(validator('')).toBe(true);
    });
});
