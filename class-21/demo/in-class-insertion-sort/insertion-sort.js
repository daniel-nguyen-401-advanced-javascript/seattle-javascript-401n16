let size = parseInt(process.argv.slice(2));

let array = [];

for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * Math.floor(100)));
}

function insertionSort(arr) {
    let i = 0;

    while (i < arr.length) {
        let j = i;

        while (j > 0 && arr[j - 1] > arr[j]) {
            //swap
            let temp = arr[j - 1];
            arr[j - 1] = arr[j];
            arr[j] = temp;
            j--;
        }

        i++;
    }
}

insertionSort(array);
console.log(array);
