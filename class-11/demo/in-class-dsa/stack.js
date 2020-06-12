const Node = require('./node.js');

class Stack {
    constructor() {
        this.top = null;
    }

    push(val) {
        let nodeToPush = new Node(val);

        // is the stack empty?
        if (this.isEmpty()) {
            this.top = nodeToPush;
            return;
        }

        nodeToPush.next = this.top;
        this.top = nodeToPush;
    }

    pop() {
        let nodeToPop = this.top;

        // is the stack empty?
        if (this.isEmpty()) {
            throw 'NullReferenceException';
            return;
        }

        this.top = this.top.next;
        nodeToPop.next = null;

        return nodeToPop;
    }

    // get the value of the top node
    peek() {
        if (this.top) return this.top.val;

        // when the top is NULL and you try to peek, throw an error
        throw 'NullReferenceException';
    }

    isEmpty() {
        return !this.top;
    }
}

module.exports = Stack;
