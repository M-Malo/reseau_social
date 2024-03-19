const express = require('express');
const Event = require("../model/Event");
const router = express.Router();


/* Ajout d'un évènement */
router.post('/new', async (req, res) => {
  try {
    await Event.addEvent(
      req.body.id_organisateur,
      req.body.nom,
      req.body.theme,
      req.body.image,
      req.body.prix,
      req.body.date_event,
      req.body.description
    )
      .then(console.log);
    res.status(200).send("L'évènement a été ajouté avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de l'évènement." });
  }
});

/* Modification d'un évènement */
router.post('/:idEvent/update', (req, res) => {
  try {
    Event.updateById(
      req.params.idEvent,
      req.body.id_organisateur,
      req.body.nom,
      req.body.theme,
      req.body.image,
      req.body.prix,
      req.body.date_event,
      req.body.description
    )
      .then(console.log);
    res.status(200).send("L'évènement a été mis à jour avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'évènement." });
  }
});

/* Suppression d'un évènement */
router.post('/:idEvent/delete', async (req, res) => {

  try {
    Event.deleteById(req.params.idEvent)
      .then(console.log);
    res.status(200).send("L'évènement a été supprimé avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'évènement." });
  }
});

/* Récupération d'un évènement par id */
router.get('/:idEvent', async (req, res) => {

  try {
    const event = await Event.getById(req.params.idEvent);
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'évènement." });
  }
});


/* Récupération des évènements selon idUser */
router.get('/get/:idUser', async (req, res) => {

  try {
    const events = await Event.getByUser(req.params.idUser);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'évènement d'un utilisateur." });
  }
});

module.exports = router;
