const express = require('express');
const Conversation = require('../model/Conversation');

const router = express.Router();

/* Création d'une conversation */
router.post('/new', async (req, res) => {
  try {
    await Conversation.addConversation(
      req.body.id_user1,
      req.body.id_user2);
    res.status(200).json({ message: "La conversation a été créée avec succès."});
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

module.exports = router;
