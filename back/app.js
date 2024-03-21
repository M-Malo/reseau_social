require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path')
const app = express();
const port = process.env.PORT
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',
    }
});



const userRouter = require(path.join(__dirname, "routes/user.js"));
const eventRouter = require(path.join(__dirname, "routes/event.js"));
const favoriRouter = require(path.join(__dirname, "routes/favori.js"));
const conversationRouter = require(path.join(__dirname, "routes/conversation.js"));
const messageRouter = require(path.join(__dirname, "routes/message.js"));

app.use(express.json());

app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/favori', favoriRouter);
app.use('/conversation', conversationRouter);
app.use('/message', messageRouter);

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('new-message', (message) => {
        console.log('Nouveau message reçu :', message);
        io.emit('new-message', message);
      });

    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
    });
});

server.listen(3000, () => {
console.log('Serveur WebSocket écoutant sur le port 3000');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
