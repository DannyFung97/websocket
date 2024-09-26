const http = require('http');
const { Server } = require('socket.io');
const express = require('express');

// Spinning the HTTP server and the WebSocket server using Socket.IO
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const port = 8000;

// Handle client connections
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Listen for 'interaction' events from the client
  socket.on('interaction', (data) => {
    console.log('Received interaction:', data);

    // Send the message to all connected clients, including the sender
    io.emit('interaction', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server is running on port ${port}`);
});
