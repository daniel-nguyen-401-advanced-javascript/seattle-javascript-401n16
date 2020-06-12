// constant time

function constantTime(n) {
    // if even, remainder = 0
    // if odd, remainder = 1
    let cmdCounter = 0;
    // command 01
    cmdCounter++;
    let remainder = n % 2;

    // command 02
    cmdCounter++;
    if (!remainder) {
        cmdCounter++;
        console.log(cmdCounter);
        return n * 2;
    }
    // ^^ command 03?

    // command 03
    cmdCounter++;
    if (remainder) {
        cmdCounter++;
        console.log(cmdCounter);
        return n * 3;
    }
    // ^^ command 04?
}

// At the end of this function
// worst case is 4 commands

//constantTime(2); // 3
//constantTime(13); // 4
//constantTime(250); // 3
//constantTime(1234567); // 4
//constantTime(9034439393494); // 3

// all together, n >>> O(1)]

function linearTime(n) {
    let cmdCounter = 0;

    cmdCounter++;
    let tempArr = [];

    cmdCounter++;
    for (let i = 0; i < n; i++) {
        cmdCounter++;
        tempArr.push(i);
    }

    cmdCounter++;
    console.log(cmdCounter);
    return tempArr;
}

//linearTime(2); // 2
//linearTime(13); // 13
//linearTime(250); // 250
//linearTime(1234567); // 1234567
//linearTime(9034439); // 9034439

// [1, 2, 3]
// [1, 2, 3, 2, 4, 6, 3, 6, 9]
// 3 * 3 = 9

function exponentialTime(n) {
    let cmdCounter = 0;

    let tempArr = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            cmdCounter++;
            tempArr.push(i * j);
        }
    }

    console.log(cmdCounter);
    return tempArr;
}

exponentialTime(2); // 4
exponentialTime(13); // 169
exponentialTime(250); // 62500
exponentialTime(1234); // 1522756
