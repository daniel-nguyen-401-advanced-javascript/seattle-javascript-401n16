// create handler
const handleShout01 = (payload) => {
    // handle that event
    console.log(payload);
};

const handleShout02 = (payload) => {
    console.log(payload.message.toUpperCase());
};

module.exports = { handleShout01, handleShout02 };
