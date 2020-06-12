class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(val) {
        let currentNode = this.head;
        let newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            return;
        }

        while (currentNode.next) {
            currentNode = currentNode.next;
        }

        currentNode.next = newNode;
    }

    toString() {
        let str = '';
        let currentNode = this.head;

        while (currentNode) {
            str += '[' + currentNode.val + '] -> ';
            currentNode = currentNode.next;
        }

        str += 'null';

        return str;
    }
}

// null -> [a] -> [b] -> [c] -> null
// null <- [a] <- [b] <- [c] <- null
// null -> [c] -> [b] -> [a] -> null

// take in a Node, not a LinkedList
const reverse = (head) => {
    // start with a traversal
    // head = a;

    let prevNode = null; // prevNode = null
    let currentNode = head; // currentNode = a
    let nextNode;

    while (currentNode) {
        nextNode = currentNode.next;
        if (prevNode && nextNode)
            console.log(
                prevNode.val,
                ' >> ',
                currentNode.val,
                '>>',
                nextNode.val,
            );
        else if (prevNode)
            console.log(prevNode.val, '>>', currentNode.val, '>>', nextNode);
        else if (nextNode)
            console.log(prevNode, '>>', currentNode.val, '>>', nextNode.val);
        else console.log(prevNode, '>>', currentNode.val, '>>', nextNode);

        currentNode.next = prevNode;
        prevNode = currentNode;
        currentNode = nextNode;
    }

    return prevNode;
};

let myList = new LinkedList();
myList.append('a');
myList.append('b');
myList.append('c');

console.log('Init List\t', myList.toString());

myList.head = reverse(myList.head);

console.log('Reversed List\t', myList.toString());
