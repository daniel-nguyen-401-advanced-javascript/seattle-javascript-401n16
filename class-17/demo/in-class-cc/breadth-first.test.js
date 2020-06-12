const TreeNode = require('./breadth-first.js').TreeNode;
const BinaryTree = require('./breadth-first.js').BinaryTree;

describe('happy path', () => {
    it('prints out a good sized tree', () => {
        let tree = new BinaryTree();

        /*
                A
            B       C
          D   E   F
        */

        tree.root = new TreeNode('A');
        tree.root.left = new TreeNode('B');
        tree.root.right = new TreeNode('C');
        tree.root.left.left = new TreeNode('D');
        tree.root.left.right = new TreeNode('E');
        tree.root.right.left = new TreeNode('F');

        expect(tree.breadthFirst()).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    });
});
