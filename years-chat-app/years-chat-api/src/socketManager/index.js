
module.exports = function (socket, io) {
    
    socket.on('connection', function (userObj) {
        console.log(`Connected Socket Id ===> ${socket.id} ==> ${JSON.stringify(userObj)}`)
        socket.join("chatroom");
    });

    socket.on('chat message', (data) => {
        console.log(`userdata ==> ${data}`);
    });
}