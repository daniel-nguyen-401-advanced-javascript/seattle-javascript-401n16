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

    append(newVal) {
        let currentNode = this.head;

        if (!currentNode) {
            this.head = new Node(newVal);
            return;
        }

        while (currentNode.next) {
            currentNode = currentNode.next;
        }

        let newNode = new Node(newVal);
        currentNode.next = newNode;
    }

    insertBefore(newVal, beforeVal) {
        let prevCurrentNode = null;
        let currentNode = this.head;

        if (currentNode && currentNode.val === beforeVal) {
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
        return false;
    }

    insertAfter(newVal, afterVal) {
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
