const express = require('express');
const User = require("../model/User");
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
  }
});

/* Suppression d'un évènement */
router.post('/:idEvent/delete', async (req, res) => {

  try {
    Event.deleteById(req.params.idEvent)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Récupération d'un évènement par id */
router.get('/:idEvent', async (req, res) => {

  try {
    Event.getById(req.params.idEvent)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});


/* Récupération d'un évènement */
router.get('/get/:idUser', async (req, res) => {

  try {
    Event.getByUser(req.params.idUser)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
