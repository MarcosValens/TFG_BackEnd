function handleConnection(socket) {
    socket.on("client-joined", (user) => {
        socket.user = user;
        const sockets = this.sockets.connected;
        const socketIds = Object.keys(sockets);
        const users = socketIds.map(socketId => sockets[socketId].user); 
        this.emit("new-user", {users, user});
    });

    socket.on("disconnect", () => {
        this.emit("user-disconnected", socket.user)
    });
    
    socket.on("new-message", message => {
        socket.broadcast.emit("message-sent", message)
    })
}

module.exports = handleConnection;