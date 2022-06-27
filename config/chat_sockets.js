// new lines
// const clientSocketIds = require('../socket');

// module.exports.chatSockets = function(socketServer, options){
module.exports.chatSockets = function(socketServer){

    // receive a req connection for connection
    let io = require('socket.io')(socketServer);
    // let io = require('socket.io')(socketServer, options);

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room', function(data){
            console.log('joining request received', data);

            socket.join(data.chatroom);
            // tell the room user has joined
            io.in(data.chatroom).emit('user joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });

    });

}