const _ = require('lodash');
const Messages = [];

const addNewMessage = (message) => {
    Messages.push(message);
};

// const johnArr = _.filter(myArr, person => person.name === 'john');

const getMessages = (room) => {
    const prevMessages = _.filter(Messages, (o) => o.room === room).map((o) => o.message);
    return prevMessages;
};

module.exports = {
    addNewMessage,
    getMessages
};
