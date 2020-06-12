// callback

const callback = () => {
    console.log('API CALL DONE');
};

function apiCall(url, callback) {
    // request from the url
    // when done, call callback
    callback();
}

const secondaryAction = val => {
    console.log(val);
};
// secondaryAction is a function
function map(array, secondaryAction) {
    for (i = 0; i < array.length; i++) secondaryAction(array[i]);

    // more code can happen here
}
