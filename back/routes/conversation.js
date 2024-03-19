const express = require('express');
const User = require('../model/User');
const Conversation = require('../model/Conversation');
const Message = require('../model/Message');

const router = express.Router();

/* Création d'une conversation */
router.post('/add', async (req, res) => {
  try {
    Conversation.addConversation(
      req.body.id_user1,
      req.body.id_user2)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Récupération des conversations d'un user */
router.get('/get/:idUser', async (req, res) => {
  try {
    Conversation.getByUser(req.params.idUser)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Récupération d'une conversation par l'idConversation */
router.get('/:idConversation', async (req, res) => {
  try {
    Conversation.getById(req.params.idConversation)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Envoi d'un message dans une conversation */
router.post('/:idConv/send', async (req, res) => {
  try {
    Message.addMessage(
      req.params.idConv,
      req.body.userId,
      req.body.contenu,
      req.body.date)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Récupération des messages d'une conversation */
router.get('/:idConversation/messages', async (req, res) => {
  try {
    Message.getByConversation(req.params.idConversation)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
