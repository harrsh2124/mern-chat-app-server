const socket = require('socket.io');
const joinRoom = require('./joinRoom');
const sendMessage = require('./sendMessage');
const socketDisconnect = require('./socketDisconnect');

const socketInit = (server) => {
    const io = socket(server, {
        cors: {
            allowedHeaders: ['Access-Control-Allow-Origin']
        }
    });

    // Listen for ping from client for their connection establishment.
    // It is sent by 'connection' event.
    io.on('connection', (socket) => {
        console.log('User is connected...');

        // Send event to the client on their successful connection establishment.
        // Client listens it by 'connected' event.
        socket.emit('connected', 'Welcome to the app...');

        joinRoom(socket);
        sendMessage(socket, io);
        socketDisconnect(socket);
    });
};

module.exports = socketInit;
