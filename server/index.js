const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // Origin means where is ur front end will be
        origin: 'http://localhost:3000',
        methods: ["GET","POST"],
    }
});
io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
    })
    socket.on('send_Message', (data) => {
        console.log(data);
        // socket.broadcast.emit('received', data);
        socket.to(data.room).emit("received", data);
    })
})


server.listen(3001, () => console.log('listening on port '+ 'http://localhost:3001'));