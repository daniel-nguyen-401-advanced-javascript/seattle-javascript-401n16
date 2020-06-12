class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

let treeA = new Node('f');
treeA.left = new Node('f');
treeA.right = new Node('f');
treeA.left.left = new Node('.js');
treeA.left.right = new Node('f');
treeA.left.right.left = new Node('.py');
treeA.left.right.right = new Node('.py');
treeA.right.right = new Node('f');
treeA.right.right.left = new Node('.java');
treeA.right.right.right = new Node('.java');

let treeB = new Node('f');
treeB.left = new Node('f');
treeB.left.left = new Node('f');
treeB.left.left.left = new Node('.cs');
treeB.left.left.right = new Node('.cs');
treeB.right = new Node('f');
treeB.right.right = new Node('f');
treeB.right.right.left = new Node('.sql');
treeB.right.right.right = new Node('f');
treeB.right.right.right.left = new Node('.html');
treeB.right.right.right.right = new Node('.css');

let treeC = new Node('f');
treeC.left = new Node('f');
treeC.left.left = new Node('f');
treeC.left.left.right = new Node('.cs');
treeC.right = new Node('f');
treeC.right.left = new Node('.sql');
treeC.right.right = new Node('f');
treeC.right.right.left = new Node('.sql');

const compareTrees = (root1, root2) => {
    console.log(countLeaves(root1) === countLeaves(root2));
};

const countLeaves = (root) => {
    // base case
    // the root is null
    if (!root) return 0;

    // this is a single node with no children
    if (!root.left && !root.right) return 1;

    // recursive case
    return countLeaves(root.right) + countLeaves(root.left);
};

compareTrees(treeA, treeB); // true
compareTrees(treeB, treeA); // true
compareTrees(treeA, treeC); // false
compareTrees(treeB, treeC); // false
