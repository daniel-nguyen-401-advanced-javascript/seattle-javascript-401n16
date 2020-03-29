/* 
Your LinkedList can successfully instantiate an empty list
You can properly insert a value into the list
Your LinkedList head property will correctly point to the beginning of the list
You can insert multiple Nodes into the list successfully
Your includes() function correctly finds a value in the list that exists
Your includes() function correctly returns false when a value is not in the list
Your toString() function prints out your LinkedList in an expected way
*/

'use strict';

const LinkedList = require('./linkedlist.js');

describe('passes all lab tests', () => {
    it('successfully instantiates an empty list', () => {
        expect(() => {
            new LinkedList();
        }).not.toThrow();
    });

    it('can properly insert a value into the list', () => {
        let newList = new LinkedList();
        newList.addToBeginning('A');
        let str = newList.printList();

        expect(str).toBe('[A] -> null');
    });

    it('head property will correctly point to the beginning of the list', () => {
        let newList = new LinkedList();
        newList.addToBeginning('A');

        expect(newList.head.val).toBe('A');
    });
});
