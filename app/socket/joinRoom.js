const { getMessages } = require('../utils/handleMessages');
const { addUser } = require('../utils/handleUser');

const joinRoom = (socket) => {
    // Listen for ping from client for joining the room.
    // It is sent by 'joinRoom' event.
    socket.on('joinRoom', ({ name, room }, callback) => {
        room = room.trim().toLowerCase();

        socket.name = name;
        socket.room = room;

        // Create new user object.
        const newUser = {
            id: socket.id,
            name,
            room
        };
        const { error } = addUser(newUser);

        let messageData = {
            message: {
                from: 'admin',
                text: `${name}, welcome to the room ${room}`,
                isError: false
            },
            isError: false
        };

        if (error) {
            messageData = {
                ...messageData,
                message: {
                    ...messageData.message,
                    text: error,
                    isError: true
                },
                isError: true
            };

            callback(messageData);
        } else {
            // Add user to the room.
            socket.join(room);

            // The event is sent on successful joining of the room.
            // Client listens it by 'newMessage' event.

            // Send message to everyone except the sender.
            socket.broadcast.to(socket.room).emit('newMessage', {
                ...messageData,
                message: {
                    ...messageData.message,
                    text: `${name} has joined the room ${room}`
                }
            });

            const prevMessages = getMessages(room);

            // Send message to the sender.
            socket.emit('newMessage', {
                ...messageData,
                prevMessages: prevMessages
            });
        }
    });
};

module.exports = joinRoom;
