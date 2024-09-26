const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


require('dotenv').config();

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('interaction', (data) => {
        io.emit('interaction', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/status', (req, res) => {
    return res.status(200).json({
        msg: 'Working',
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


