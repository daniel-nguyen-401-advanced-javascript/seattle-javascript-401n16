'use strict';

// Generate the nth fibonacci number, 2 different ways

// index: 0, 1, 2, 3, 4, 5, ..... , 1000
// value: 0, 1, 1, 2, 3, 5, ..... , ??

// function where
// given index n, return value at index n

// iterative (using for / while loops)

function fibIter(n) {
    // fib(n) = fib(n-1) + fib(n-2);

    // fib(n-1)
    let nMin1 = 1;

    // fib(n-2)
    let nMin2 = 0;
    let fibN;

    for (let i = 2; i <= n; i++) {
        fibN = nMin1 + nMin2;
        console.log('Curr fibN', fibN, '=', nMin1, '+', nMin2);
        nMin2 = nMin1;
        nMin1 = fibN;
    }

    console.log('final val', fibN);
}

// n = 3;
function fibRec(n) {
    // base case
    // the simplest case for n, where we know exactly what to return
    if (n === 0) console.log('base case 0');
    if (n === 1) console.log('base case 1');
    if (n === 0) return 0;
    if (n === 1) return 1;

    // recursive case
    // call this function again, changing n
    // the hope is that EVENTUALLY n will be changed to match a base case

    // call the same func with new n values
    // ? =  fib(2)            + fib(1)
    // ? =  (fib(1) + fib(0)) + fib(1)
    // ? =  (1      + 0     ) + 1
    // 2

    console.log('calling fib(', n - 1, ') + fib(', n - 2, ')');
    return fibRec(n - 1) + fibRec(n - 2);
}

let n = 20;
//fibIter(n);
console.log('fib result:', fibRec(n));
