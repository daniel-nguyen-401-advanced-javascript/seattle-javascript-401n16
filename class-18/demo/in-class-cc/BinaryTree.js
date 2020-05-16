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

    // have a param root, when root is null default it to this.root
    findMaximumValue(root = this.root) {
        // what does it mean to find the max?
        // traverse, and check against "last max"

        // base case: root is null
        if (!root) return;

        // base case: root has no children

        let rootMax = root.val;
        let leftMax, rightMax;

        if (root.left) leftMax = this.findMaximumValue(root.left);

        if (root.right) rightMax = this.findMaximumValue(root.right);

        // rootMax, leftMax and rightMax
        // compare them all and just return the
        // "true max"

        let max = rootMax;

        if (leftMax > max) max = leftMax;
        if (rightMax > max) max = rightMax;

        return max;
    }
}

let sampleTree = new BinaryTree();

/* 
        2
    7       5
  2  11      9
*/
sampleTree.root = new Node(2);
sampleTree.root.left = new Node(7);
sampleTree.root.right = new Node(5);
sampleTree.root.left.left = new Node(2);
sampleTree.root.left.right = new Node(1);
sampleTree.root.right.right = new Node(-9);

console.log(sampleTree.findMaximumValue(null));
