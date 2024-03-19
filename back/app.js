require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path')
const app = express();
const port = process.env.PORT

const compteRouter = require(path.join(__dirname, "routes/compte.js"));
const eventRouter = require(path.join(__dirname, "routes/evenement.js"));
const conversationRouter = require(path.join(__dirname, "routes/conversation.js"));


app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));

app.use('/', compteRouter);
app.use('/user', compteRouter);
app.use('/event', eventRouter);
app.use('/conversations', conversationRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
