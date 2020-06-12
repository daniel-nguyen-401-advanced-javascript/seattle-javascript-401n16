'use strict';

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class QNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
    }

    enqueue(val) {
        let newNode = new QNode(val);
        //let newNode = new QNode(TreeNode);

        // base case - empty queue
        if (!this.front && !this.rear) {
            this.front = newNode;
            this.rear = newNode;
            return;
        }

        // iterative case - non-empty queue
        // since we have access to the front and rear, we
        // actually don't need to iterate
        this.rear.next = newNode;
        this.rear = newNode;
    }

    dequeue() {
        // base case - empty queue
        if (!this.front && !this.rear) return;

        // iterative case - non-empty queue
        // since we have access to the front and rear, we
        // actually don't need to iterate
        let oldFront = this.front;
        this.front = this.front.next;

        oldFront.next = null;
        return oldFront.val;
        //return QNode.val = TreeNode

        // now we have a treeNode, but we want the value, so we need another .val
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    breadthFirst(root = this.root) {
        let printedArr = [];

        // base case - empty tree
        if (!root) return;

        // iterative case - tree with children

        let q = new Queue();
        q.enqueue(root); // Node {A}

        // as long as there is something in the queue,
        // enqueue children and dequeue

        while (q.front) {
            // QNode { TreeNode {A} }.val.left
            // TreeNode {A}.left
            if (q.front.val.left) q.enqueue(q.front.val.left);
            // Node {A}.right
            if (q.front.val.right) q.enqueue(q.front.val.right);

            let removedItem = q.dequeue();
            printedArr.push(removedItem.val);
        }

        return printedArr;
    }
}

module.exports = { TreeNode, QNode, BinaryTree };
