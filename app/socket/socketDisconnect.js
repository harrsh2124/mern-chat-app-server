const { removeUser } = require('../utils/handleUser');

const socketDisconnect = (socket) => {
    // Listen from client for disconnection.
    // It is sent by 'disconnect' event.
    socket.on('disconnect', () => {
        const existingUser = {
            id: socket.id,
            name: socket.name,
            room: socket.room
        };
        removeUser(existingUser);

        // Leave the room for that socket user.
        socket.leave(socket.room);

        // The event is sent on successful leaving of the room.
        // Client listens it by 'newMessage' event.

        // Send message to everyone except the sender.
        socket.broadcast.to(socket.room).emit('newMessage', {
            message: {
                from: 'admin',
                text: `${socket.name}, has left the room.`,
                isError: false
            },
            isError: false
        });
        console.log(`User ${socket.name} has left the socket.`);
    });
};

module.exports = socketDisconnect;
