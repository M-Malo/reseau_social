const express = require('express');
const User = require('../model/User');
const Event = require('../model/Event');
const Favoris = require('../model/Favoris');

const router = express.Router();

/* Création d'un favori */
router.post('/new', async (req, res) => {
  try {
    Favoris.addFavori(
      req.body.id_event,
      req.body.id_user)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Récupération des favoris d'un user */
router.get('/user/:idUser', async (req, res) => {
  try {
    Favoris.getByUser(req.params.idUser)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Récupération des favoris d'un event */
router.get('/event/:idEvent', async (req, res) => {
  try {
    Favoris.getByEvent(req.params.idEvent)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
