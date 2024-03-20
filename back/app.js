require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path')
const app = express();
const port = process.env.PORT

const userRouter = require(path.join(__dirname, "routes/user.js"));
const eventRouter = require(path.join(__dirname, "routes/event.js"));
const conversationRouter = require(path.join(__dirname, "routes/conversation.js"));
const favoriRouter = require(path.join(__dirname, "routes/favori.js"));

app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/conversation', conversationRouter);
app.use('/favori', favoriRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
