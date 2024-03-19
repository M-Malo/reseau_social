const express = require('express');
const Conversation = require('../model/Conversation');
const Message = require('../model/Message');

const router = express.Router();

/* Création d'une conversation */
router.post('/add', async (req, res) => {
  try {
    await Conversation.addConversation(
      req.body.id_user1,
      req.body.id_user2);
    res.status(200).send("La conversation a été créée avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la création de la conversation." });
  }
});

/* Récupération des conversations d'un user */
router.get('/get/:idUser', async (req, res) => {
  try {
    const conversation = await Conversation.getByUser(req.params.idUser);
    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des conversations de l'utilisateur." });
  }
});

/* Récupération d'une conversation par l'idConversation */
router.get('/:idConversation', async (req, res) => {
  try {
    const conversation = await Conversation.getById(req.params.idConversation);
    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la conversation." });
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
    res.status(200).send("Le message a été créé avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la création du message." });
  }
});

/* Récupération des messages d'une conversation */
router.get('/:idConversation/messages', async (req, res) => {
  try {
    const messages = await Message.getByConversation(req.params.idConversation);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la conversation." });
  }
});


module.exports = router;
