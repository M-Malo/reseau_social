const express = require('express');
const User = require('../model/User');
const Conversation = require('../model/Conversation');
const Message = require('../model/Message');

const router = express.Router();

/* Test création d'une conversation */
router.post('/add', async (req, res) => {
  try {
    Conversation.addConversation(
      "65f9549fbdcbc7370c3b8db5",
      "65f45276023b80f8d23dc2cb")
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

router.post('/get/:X', async (req, res) => {
  try {
    Conversation.getByUser(req.params.X)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Test envoi d'un message */
router.post('/:X/send', async (req, res) => {
  try {
    Message.addMessage(
      req.params.X,
      "65f4551940f8d922df410ac9",
      "bonjour",
      Date.now())
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
