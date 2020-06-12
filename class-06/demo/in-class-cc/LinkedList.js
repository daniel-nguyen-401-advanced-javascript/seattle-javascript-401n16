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

    // add to the end of a list
    append(newVal) {
        // check if the list exists
        // traverse to the end

        // O(n)
        // end of the list: currentNode.next = null

        let currentNode = this.head;

        // what if list is empty
        if (!currentNode) {
            this.head = new Node(newVal);
            return;
        }

        // while (null.next)
        while (currentNode.next) {
            // not null
            currentNode = currentNode.next;
        }

        // when i leave the while loop
        // what is currentNode?
        // currentNode.next = null
        // currentNode is set as a Node

        let newNode = new Node(newVal);
        // currentNode is the end of the list
        currentNode.next = newNode;
    }

    insertBefore(newVal, beforeVal) {
        // O(n)
        // if I'm inserting before
        // [A] -> [x] -> [C] -> null
        // [A] -> [nV] -> [x] -> C
        // keep track of [x] and node before [x]

        let prevCurrentNode = null;
        let currentNode = this.head;

        if (currentNode && currentNode.val === beforeVal) {
            // the head is what we're trying to insert before
            let newNode = new Node(newVal);
            newNode.next = this.head;
            this.head = newNode;
            return;
        }

        while (currentNode) {
            if (currentNode.val === beforeVal) {
                let newNode = new Node(newVal);
                prevCurrentNode.next = newNode;
                newNode.next = currentNode;
                return;
            }

            prevCurrentNode = currentNode;
            currentNode = currentNode.next;
        }

        // when i reach here
        // currentNode = null
        // i did not find beforeVal/[x]
        return false;
    }

    insertAfter(newVal, afterVal) {
        // O(n)
        // if I'm inserting after
        // [A] -> [x] -> [C] -> null
        // [A] -> [x] -> [nV] -> C
        // keep track of [x] and [x].next

        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.val === afterVal) {
                let newNode = new Node(newVal);

                let nextCurrentNode = currentNode.next;
                currentNode.next = newNode;
                newNode.next = nextCurrentNode;
            }

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

        str += 'null';

        return str;
    }
}

module.exports = LinkedList;
