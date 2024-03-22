const express = require('express');
const Favoris = require('../model/Favoris');

const router = express.Router();

/* Création d'un favori */
router.post('/new', async (req, res) => {
  try {
    await Favoris.addFavori(
      req.body.id_event,
      req.body.id_user)
      .then(console.log);
    res.status(200).json({ message: "Le favori a été créé avec succès."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la création du favori." });
  }
});

/* Récupération des favoris d'un user */
router.get('/user/:idUser', async (req, res) => {
  try {
    const favoris = await Favoris.getByUser(req.params.idUser);
    res.json(favoris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des favoris de l'utilisateur." });
  }
});

/* Récupération des favoris d'un event */
router.get('/event/:idEvent', async (req, res) => {
  try {
    const favoris = await Favoris.getByEvent(req.params.idEvent);
    res.json(favoris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des favoris d'un évènement." });
  }
});


module.exports = router;
