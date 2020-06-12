// function that takes in a tree (root node)
// outputs a new tree (root node) where
// - divis by 3 > fizz
// - divis by 5 > buzz
// - divis by 3 & 5 > fizzbuzz
// - divis by neither > ''

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/* 
            4 
        3       5
      15 21   6   10

           '4' 
        F       B
      FB  F    F   B   



  fBT(node(4)) 
    - newRoot = node('4'); 
    - fBT(node(3)); 
        - newRoot = node('Fizz'); 
        - fBT(node(15)); 
            - return newRoot = node('FizzBuzz');
        - fBT(node(21)); 
            - return newRoot = node('Fizz'); 
        - return node('Fizz') 
            - .left = node('FizzBuzz); 
            - .right = node('Fizz');
    - fBT(node(5));
        - newRoot = node('Buzz'); 
        - fBT(node(6))
            - return newRoot('Fizz'); 
        - fBT(node(10))
            - return newRoot('Buzz'); 
        - return node('Buzz')
            - .left = node('Fizz')
            - .right = node('Buzz'); 
    - return node('4'); 
        - .left = return node('Fizz') 
            - .left = node('FizzBuzz); 
            - .right = node('Fizz');
        - .right = return node('Buzz')
            - .left = node('Fizz')
            - .right = node('Buzz'); 
*/

let sampleTreeRoot = new Node(4);
sampleTreeRoot.left = new Node(3);
sampleTreeRoot.left.left = new Node(15);
sampleTreeRoot.left.right = new Node(21);
sampleTreeRoot.right = new Node(5);
sampleTreeRoot.right.left = new Node(6);
sampleTreeRoot.right.right = new Node(10);

const fizzBuzzTree = (root) => {
    // simplest base case - there is only one node in the tree or leaf node (root)
    let replacementStr = '';

    if (root.val % 3 === 0) replacementStr += 'Fizz';
    if (root.val % 5 === 0) replacementStr += 'Buzz';

    let newRoot = new Node(replacementStr ? replacementStr : `${root.val}`);

    // recursive step - is there a left/right subtree
    if (root.left) newRoot.left = fizzBuzzTree(root.left);
    if (root.right) newRoot.right = fizzBuzzTree(root.right);

    return newRoot;
};
