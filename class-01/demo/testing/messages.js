const welcome = name => {
    return 'Welcome ' + name + '!';
};

const goodbye = name => {
    return 'See ya later ' + name + '!';
};

// export welcome
module.exports = { welcome, goodbye };
