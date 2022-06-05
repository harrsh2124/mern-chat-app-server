const { addNewMessage } = require('../utils/handleMessages');

const sendMessage = (socket, io) => {
    // Listen from client for new message.
    // It is sent by 'sendMessage' event.
    socket.on('sendMessage', (message, callback) => {
        let messageData = {
            message: {
                from: socket.name,
                text: message,
                isError: false
            },
            isError: false
        };

        addNewMessage({
            ...messageData,
            room: socket.room
        });

        // The event is sent on new message sent by the client.
        // Client listens it by 'newMessage' event.

        // Send message to everyone including the sender.
        io.to(socket.room).emit('newMessage', messageData);

        callback();
    });
};

module.exports = sendMessage;
