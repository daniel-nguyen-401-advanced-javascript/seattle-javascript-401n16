'use strict';

const printArr = (arr) => {
    let str = '[ ';

    for (let i = 0; i < arr.length; i++) str += arr[i] + ', ';

    str += ']';

    console.log(str);
};

class Node {
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
        let newNode = new Node(val);

        if (this.rear) {
            this.rear.next = newNode;
            this.rear = this.rear.next;
        } else {
            this.front = newNode;
            this.rear = newNode;
        }
    }

    dequeue() {
        if (this.front) {
            let temp = this.front;
            this.front = this.front.next;
            temp.next = null;
            return temp.val;
        }

        return 'error';
    }

    print() {
        let currentNode = this.front;
        let str = 'front > ';

        while (currentNode) {
            str += currentNode.val + ' > ';
            currentNode = currentNode.next;
        }

        str += 'rear';

        return str;
    }
}

// ['A', 'B', 'C'] , 3
const emmmQ = (arr, k) => {
    let q = new Queue();
    let kT = k;

    for (let i = 0; i < arr.length; i++) q.enqueue(arr[i]);

    console.log(q.print());

    while (q.front != q.rear) {
        let currentVal = q.dequeue();
        kT--;

        if (kT !== 0) q.enqueue(currentVal);
        console.log(q.print(), kT);

        if (kT === 0) kT = k;
    }

    return q.front.val;

    // rear > | < front
    // rear > C < B < A < front

    // currentItem = A
    // kT = 2
    // rear > C < B < front

    // rear > A < C < B < front
    // currentItem = B
    // kT = 1
    // rear > A < C < front
    // rear > B < A < C < front

    // rear > B < A < C < front
    // currentItem = C
    // kT = 0
    // rear > B < A < front
    // rear > B < A < front

    // kT = 3
    // currentItem = A
    // kT = 2
    // rear > B < front
    // rear > A < B < front

    // kT = 2
    // currentItem = B
    // kT = 1
    // rear > A < front
    // rear > B < A < front

    // kT = 1
    // currentItem = A
    // kT = 0
    // rear > B < front
    // kT = 3;
};

// ['A', 'B', 'C'] , 3

const emmm = (oArr, k) => {
    // Make sure you don't mess up the input, so make a copy of it
    let arr = [...oArr];

    printArr(arr);

    // start at the beginning of the array
    let i = 0;
    // count up to k
    // traverse the array -> when you reach the end, loop back to beginning
    // when i = arr.length >> i = 0;
    // for each character / valid item
    // mark that you've counted towards K
    // when k is at it's limit (3), reset k to 0 and remove the current item
    let kT = k;
    let li = -1;

    if (k <= 0) return 'error';

    while (i !== li) {
        if (arr[i] !== '_') {
            kT--;
            li = i;
        }

        if (kT === 0) {
            arr[i] = '_';
            printArr(arr);
            kT = k;
        }

        i++;
        i = i % arr.length;
    }

    // error check
    if (li === -1) return 'error';

    // return the item at i/li
    return arr[i];
};

let arr01 = ['A', 'B', 'C'];
let arr02 = ['A', 'B', 'C', 'D', 'E'];

console.log('res: ', emmmQ(arr01, 3));
console.log('res: ', emmmQ(arr02, 3));
console.log('res: ', emmmQ(arr01, 5));
