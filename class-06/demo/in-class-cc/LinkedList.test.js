const LinkedList = require('./LinkedList.js');

describe('happy path', () => {
    it('can successfully add a node to the end of the linked list', () => {
        let myList = new LinkedList();

        expect(myList.toString()).toBe('null');

        myList.append('A');
        expect(myList.toString()).toBe('[A] -> null');

        myList.append('B');
        expect(myList.toString()).toBe('[A] -> [B] -> null');
    });

    it('can successfully add multiple nodes to the end of a linked list', () => {
        let myList = new LinkedList();
        myList.append('A');
        myList.append('B');
        myList.append('C');
        myList.append('D');

        expect(myList.toString()).toBe('[A] -> [B] -> [C] -> [D] -> null');
    });

    it('can successfully insert a node before a node located in the middle of a linked list', () => {
        let myList = new LinkedList();
        myList.append('A');
        myList.append('B');
        myList.append('x');
        myList.append('D');
        myList.append('E');

        myList.insertBefore('nV', 'x');

        expect(myList.toString()).toBe(
            '[A] -> [B] -> [nV] -> [x] -> [D] -> [E] -> null',
        );
    });

    it('can successfully insert a node before the first node of a linked list', () => {
        let myList = new LinkedList();
        myList.append('x');

        myList.insertBefore('nV', 'x');
        expect(myList.toString()).toBe('[nV] -> [x] -> null');
    });

    it('can successfully insert after a node in the middle of the linked list', () => {
        let myList = new LinkedList();
        myList.append('A');
        myList.append('B');
        myList.append('x');
        myList.append('D');
        myList.append('E');

        myList.insertAfter('nV', 'x');

        expect(myList.toString()).toBe(
            '[A] -> [B] -> [x] -> [nV] -> [D] -> [E] -> null',
        );
    });

    it('can successfully insert a node after the last node of the linked list', () => {
        let myList = new LinkedList();
        myList.append('A');
        myList.append('B');
        myList.append('C');
        myList.append('D');
        myList.append('x');

        myList.insertAfter('nV', 'x');

        expect(myList.toString()).toBe(
            '[A] -> [B] -> [C] -> [D] -> [x] -> [nV] -> null',
        );
    });
});

describe('expected failures', () => {});

describe('edge cases', () => {});
