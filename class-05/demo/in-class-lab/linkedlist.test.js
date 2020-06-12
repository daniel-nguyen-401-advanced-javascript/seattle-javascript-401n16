'use strict';

const classes = require('./linkedlist.js');
const LinkedList = classes.LinkedList;

describe('happy path', () => {
    it('successfully instantiates an empty list', () => {
        expect(() => {
            return new LinkedList();
        }).not.toThrow();

        let myList = new LinkedList();
        expect(myList.head).toBe(null);
    });

    it('properly inserts a value into the list', () => {
        let myList = new LinkedList();

        expect(() => {
            myList.insert('A');
        }).not.toThrow();
        let str = '[' + myList.head.val + '] -> ' + myList.head.next;
        expect(str).toBe('[A] -> null');
    });

    it('has a head property that points to the beginning', () => {
        let myList = new LinkedList();

        myList.insert('A');
        myList.insert('B');

        expect(myList.head).toBeDefined();
        expect(myList.head.val).toBe('B');
    });

    it('can insert multiple Nodes into the list', () => {
        let myList = new LinkedList();

        myList.insert('E');
        myList.insert('D');
        myList.insert('C');
        myList.insert('B');
        myList.insert('A');

        expect(myList.head).toBeDefined();
        expect(myList.head.val).toBe('A');
        expect(myList.head.next.val).toBe('B');
        expect(myList.head.next.next.val).toBe('C');
        expect(myList.head.next.next.next.val).toBe('D');
        expect(myList.head.next.next.next.next.val).toBe('E');
    });

    it('can search for an existing Node', () => {
        let myList = new LinkedList();
        myList.insert('A');
        myList.insert('B');
        myList.insert('C');

        expect(myList.includes('B')).toBe(true);
    });

    it('can print the list in an expected way', () => {
        let myList = new LinkedList();
        myList.insert(1);
        myList.insert(2);
        myList.insert(3);

        // expected string
        let str = '[3] -> [2] -> [1] -> null';

        expect(myList.toString()).toBe(str);
    });
});

describe('expected failures', () => {
    it("can respond correctly when searching for a Node that doesn't exist", () => {
        let myList = new LinkedList();
        myList.insert('A');
        myList.insert('B');
        myList.insert('C');

        expect(myList.includes('D')).toBe(false);
    });
});
