'use strict';

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(val) {
        try {
            let newNode = new Node(val);

            // assume list starts like this:
            // [A] -> null
            // this.head = [A]

            // newNode.next = A
            // [val] -> [A] -> null
            // this.head = [A]

            newNode.next = this.head;
            this.head = newNode;
            // [val] -> [A] -> null
            // this.head = [val]
        } catch (e) {
            throw e;
        }
    }

    includes(val) {
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.val === val) return true;
            currentNode = currentNode.next;
        }

        return false;
    }

    toString() {
        let currentNode = this.head;
        let str = '';

        while (currentNode) {
            str += '[' + currentNode.val + '] -> ';
            currentNode = currentNode.next;
        }

        // we exit the while loop when currentNode === null
        str += 'null';
        return str;
    }
}

module.exports = { Node, LinkedList };
