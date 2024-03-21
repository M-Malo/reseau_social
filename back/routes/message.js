const express = require('express');
const Conversation = require('../model/Conversation');
const Message = require('../model/Message');

const router = express.Router();

/* Récupération des messages d'une conversation */
router.get('/:idConversation', async (req, res) => {
  try {
    const messages = await Message.getByConversation(req.params.idConversation);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la conversation." });
  }
});

/* Envoi d'un message dans une conversation */
router.post('/:idConv/new', async (req, res) => {
  try {
    Message.addMessage(
      req.params.idConv,
      req.body.userId,
      req.body.contenu,
      req.body.date)
      .then(console.log);
    res.status(200).json({ message: "Le message a été créé avec succès."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la création du message." });
  }
});

module.exports = router;
