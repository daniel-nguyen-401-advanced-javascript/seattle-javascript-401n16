class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        // default linked list is empty
        this.head = null;
    }

    addToBeginning(val) {
        let cmdCounter = 0;

        cmdCounter++;
        let newNode = new Node(val);

        cmdCounter++;
        newNode.next = this.head;

        cmdCounter++;
        this.head = newNode;

        // console.log('atb counter', cmdCounter);
        // O(3) >> O(1)
    }

    printList() {
        let cmdCounter = 0;
        let currNode = this.head;
        let str = '';

        while (currNode != null) {
            cmdCounter++;
            str += '[' + currNode.val + '] -> ';
            currNode = currNode.next;
        }

        cmdCounter++;
        str += 'null';
        // console.log('pl counter', cmdCounter);
        // O(n+1) >> O(n)
        console.log(str);
        return str;
    }
}
/*
let myList = new LinkedList();

// n = 0
myList.printList();

// n = 1
myList.addToBeginning('A');
myList.printList();

// n = 2
myList.addToBeginning('B');
myList.printList();

// n = 3
myList.addToBeginning('C');
myList.printList();

// n = 4
myList.addToBeginning('D');
myList.printList();

// n = 5
myList.addToBeginning('E');
myList.printList();
*/

module.exports = LinkedList;
