/* 

You can successfully instantiate an empty tree
You can successfully instantiate a tree and add a single root node
You can successfully add a left and right child to a single root node
You can successfully do a preOrder traversal
You can successfully do an inOrder traversal
You can successfully do a postOrder traversal
You can successfully add a value to a binary search tree
You can search a binary search tree for a value and get the correct true/false result

*/

const trees = require('./tree.js');
const Node = trees.Node;
const BT = trees.BinaryTree;
const BST = trees.BinarySearchTree;

describe('Binary Tree tests', () => {
    it('can successfully instantiate an empty tree', () => {
        let tree = new BT();

        expect(tree).toBeDefined();
        expect(tree.root).toBe(null);
    });

    it('can successfully instantiate a tree and add a root node', () => {
        let tree = new BT();
        let newNode = new Node('A');
        tree.root = newNode;

        expect(tree).toBeDefined();
        expect(tree.root).toBeDefined();
        expect(tree.root.val).toBe('A');
    });

    it('can successfully add a left and right child to the root', () => {
        let tree = new BT();
        let newNode = new Node('A');
        tree.root = newNode;

        let leftChild = new Node('B');
        let rightChild = new Node('C');

        tree.root.left = leftChild;
        tree.root.right = rightChild;

        expect(tree).toBeDefined();
        expect(tree.root).toBeDefined();
        expect(tree.root.val).toBe('A');

        expect(tree.root.left).toBeDefined();
        expect(tree.root.left.val).toBe('B');

        expect(tree.root.right).toBeDefined();
        expect(tree.root.right.val).toBe('C');
    });

    it('can successfully do a preOrder traversal', () => {
        let tree = new BT();

        tree.root = new Node('A');
        tree.root.left = new Node('B');
        tree.root.left.left = new Node('D');
        tree.root.left.right = new Node('E');
        tree.root.right = new Node('C');
        tree.root.right.right = new Node('F');
        /*
                    A
                 B     C
              D    E      F

        // preOrder: A B D E C F
        // inOrder: D B E A C F
        // postOrder: D E B F C A
        */

        let traversalResults = tree.preOrder();
        expect(traversalResults).toEqual(['A', 'B', 'D', 'E', 'C', 'F']);
    });

    it('can successfully do a inOrder traversal', () => {
        let tree = new BT();

        tree.root = new Node('A');
        tree.root.left = new Node('B');
        tree.root.left.left = new Node('D');
        tree.root.left.right = new Node('E');
        tree.root.right = new Node('C');
        tree.root.right.right = new Node('F');
        /*
                    A
                 B     C
              D    E      F

        // preOrder: A B D E C F
        // inOrder: D B E A C F
        // postOrder: D E B F C A
        */

        let traversalResults = tree.inOrder();
        expect(traversalResults).toEqual(['D', 'B', 'E', 'A', 'C', 'F']);
    });

    it('can successfully do a postOrder traversal', () => {
        let tree = new BT();

        tree.root = new Node('A');
        tree.root.left = new Node('B');
        tree.root.left.left = new Node('D');
        tree.root.left.right = new Node('E');
        tree.root.right = new Node('C');
        tree.root.right.right = new Node('F');
        /*
                    A
                 B     C
              D    E      F

        // preOrder: A B D E C F
        // inOrder: D B E A C F
        // postOrder: D E B F C A
        */

        let traversalResults = tree.postOrder();
        expect(traversalResults).toEqual(['D', 'E', 'B', 'F', 'C', 'A']);
    });
});

describe('Binary Search Tree tests', () => {
    it('can correctly add a node to the tree', () => {
        let tree = new BST();

        tree.root = new Node(15);
        tree.root.left = new Node(8);
        tree.root.left.left = new Node(4);
        tree.root.left.right = new Node(12);
        tree.root.right = new Node(20);
        tree.root.right.right = new Node(22);

        // Binary Search Trees are typically numeric based
        /*
                    15
                8        20
              4   12   19   22
               6   14 16

        // preOrder: 15 8 4 6 12 14 20 19 16 22
        */

        tree.add(6);
        tree.add(14);
        tree.add(19);
        tree.add(16);

        let traversalResults = tree.preOrder();
        expect(traversalResults).toEqual([15, 8, 4, 6, 12, 14, 20, 19, 16, 22]);
    });

    it('can correctly return true/false if BST contains value', () => {
        let tree = new BST();

        tree.root = new Node(15);
        tree.root.left = new Node(8);
        tree.root.left.left = new Node(4);
        tree.root.left.right = new Node(12);
        tree.root.right = new Node(20);
        tree.root.right.right = new Node(22);

        // Binary Search Trees are typically numeric based
        /*
                    15
                8        20
              4   12       22  
        */

        expect(tree.contains(4)).toBe(true);
        expect(tree.contains(17)).toBe(false);
    });
});
