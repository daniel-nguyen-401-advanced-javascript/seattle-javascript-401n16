'use strict';

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    preOrder(root = this.root) {
        // root > left > right
        if (!root) return;

        let rootArr = [];
        let leftArr = [];
        let rightArr = [];

        // arr = [A]
        rootArr.push(root.val);

        if (root.left) {
            // leftArr = [B, D, E]
            leftArr = this.preOrder(root.left);
        }

        if (root.right) {
            // rightArr = [C, F]
            rightArr = this.preOrder(root.right);
        }

        rootArr = [...rootArr, ...leftArr, ...rightArr];

        return rootArr;
    }

    inOrder(root = this.root) {
        // left > root > right
        if (!root) return;

        let rootArr = [];
        let leftArr = [];
        let rightArr = [];

        // arr = [A]
        rootArr.push(root.val);

        if (root.left) {
            // leftArr = [B, D, E]
            leftArr = this.inOrder(root.left);
        }

        if (root.right) {
            // rightArr = [C, F]
            rightArr = this.inOrder(root.right);
        }

        rootArr = [...leftArr, ...rootArr, ...rightArr];

        return rootArr;
    }

    postOrder(root = this.root) {
        // left > right > root
        if (!root) return;

        let rootArr = [];
        let leftArr = [];
        let rightArr = [];

        // arr = [A]
        rootArr.push(root.val);

        if (root.left) {
            // leftArr = [B, D, E]
            leftArr = this.postOrder(root.left);
        }

        if (root.right) {
            // rightArr = [C, F]
            rightArr = this.postOrder(root.right);
        }

        rootArr = [...leftArr, ...rightArr, ...rootArr];

        return rootArr;
    }
}

class BinarySearchTree extends BinaryTree {
    constructor() {
        super();
    }

    add(val) {
        if (!this.root) {
            this.root = new Node(val);
            return;
        }

        // Binary Search Trees are typically numeric based
        /*
                    15
                8        20
              4   12       22  
        */

        let currentNode = this.root;

        while (currentNode) {
            if (currentNode.val > val) {
                if (!currentNode.left) {
                    currentNode.left = new Node(val);
                    return;
                } else currentNode = currentNode.left;
            } else if (currentNode.val < val) {
                if (!currentNode.right) {
                    currentNode.right = new Node(val);
                    return;
                } else currentNode = currentNode.right;
            } else if (currentNode.val === val) return;
        }
    }

    contains(val) {
        let currentNode = this.root;

        while (currentNode) {
            if (currentNode.val > val) currentNode = currentNode.left;
            else if (currentNode.val < val) currentNode = currentNode.right;
            else if (currentNode.val === val) return true;
        }

        return false;
    }
}

module.exports = { Node, BinaryTree, BinarySearchTree };
