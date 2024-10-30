const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// const Game = require('./models/game');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});


app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"));

const gameRoutes = require('./routes/gameRoutes');
app.use('', gameRoutes);

io.on('connection', (socket) => {
    console.log('New Client Connected: ', socket.id);

    socket.on('joinGame', ({ gameId, player }) => {
        socket.join(gameId);
        console.log(`${player} joined game: ${gameId}`);

        socket.to(gameId).emit('playerJoined', player);
    });

    socket.on('gameEnded', ({ gameId, draw }) => {
        if (draw) {
            io.to(gameId).emit('gameDraw');
        } else {
            // If there is a winner, emit the winner message
            io.to(gameId).emit('gameWon', { winner });
        }
    })

    socket.on('makeMove', ({ gameId, board, currentPlayer }) => {
        io.in(gameId).emit('updateBoard', { board, currentPlayer });
    });

    socket.on('disconnect', () => {
        console.log('Client Disconnected: ', socket.id);
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));