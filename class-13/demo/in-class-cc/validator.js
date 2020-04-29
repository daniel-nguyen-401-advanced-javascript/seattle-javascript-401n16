class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.top = null;
    }

    push(val) {
        let newNode = new Node(val);
        newNode.next = this.top;

        this.top = newNode;
    }

    pop() {
        if (!this.top) return null;

        let tempNode = this.top;

        this.top = tempNode.next;

        tempNode.next = null;

        return tempNode.val;
    }

    toString() {
        let str = '';

        let currentNode = this.top;

        while (currentNode) {
            str += currentNode.val + '\n';
            currentNode = currentNode.next;
        }

        str += 'null';
        return str;
    }
}

const validator = (str) => {
    let chars = str.split('');
    let bracketStack = new Stack();

    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === '{' || chars[i] === '[' || chars[i] === '(') {
            // this is an opening bracket
            // should be "pushed" to stack
            bracketStack.push(chars[i]);
        } else if (chars[i] === '}' || chars[i] === ']' || chars[i] === ')') {
            let poppedVal = bracketStack.pop();

            if (chars[i] === '}' && poppedVal != '{') return false;
            if (chars[i] === ']' && poppedVal != '[') return false;
            if (chars[i] === ')' && poppedVal != '(') return false;
        }
    }

    // when we get here
    // the stack should be empty
    // every opening had a closing

    if (bracketStack.top) return false;

    return true;
};

module.exports = validator;
