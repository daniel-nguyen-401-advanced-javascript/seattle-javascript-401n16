const Node = require('./node.js');

class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
    }

    enqueue(val) {
        // adding to the queue

        let nodeToQueue = new Node(val);

        if (this.isEmpty()) {
            this.front = nodeToQueue;
            this.rear = nodeToQueue;
            return;
        }

        this.rear.next = nodeToQueue;
        this.rear = nodeToQueue;
    }

    dequeue() {
        let nodeToDequeue = this.front;

        if (this.isEmpty()) {
            throw 'NullReferenceException';
            return;
        }

        this.front = this.front.next;
        nodeToDequeue.next = null;

        return nodeToDequeue;
    }

    peek() {
        // look at the front of the queue

        // if the queue is empty
        if (this.isEmpty()) {
            throw 'NullReferenceException';
            return;
        }

        return this.front.val;
    }

    isEmpty() {
        // if the queue is empty, front and rear are null

        return !this.front && !this.rear;
    }
}
