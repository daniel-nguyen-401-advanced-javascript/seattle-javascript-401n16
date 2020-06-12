module.exports = (payload) => {
    console.log(
        payload.name,
        'whispers **',
        payload.message.toLowerCase(),
        '**',
    );
    return true;
};
