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
    res.status(200).json({ message: "L'évènement a été ajouté avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de l'évènement." });
  }
});

/* Modification d'un évènement */
router.post('/update/:idEvent', (req, res) => {
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
    res.status(200).json({ message: "L'évènement a été mis à jour avec succès."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'évènement." });
  }
});

/* Récupération de l'ensemble des évènements */
router.get('/', async (req, res) => {

  try {
    const event = await Event.getAll();
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des évènements." });
  }
});


/* Récupération de l'ensemble des évènements selon le filtrage selectionné */
router.get('/filtre/:prix/:nom/:theme', async (req, res) => {
  console.log(req.params.prix, req.params.nom, req.params.theme);
  try {
    const event = await Event.getByFiltre(
      Number(req.params.prix),
      req.params.nom != '-1' ? req.params.nom : null,
      req.params.theme != '-1' ? Number(req.params.theme) : null
    );
    //res.json(event);
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des évènements." });
  }
});
/*router.post('/filter', async (req, res) => {
  try {
    const events = await Event.getByFiltre(
      Number(req.body.prixMax),
      req.body.nom!==""? req.body.nom : null,
      req.body.theme!=="-1"? Number(req.body.theme) : null);
    // TODO
    //ajouter dans le json une variable correspondant à favori (true/false)
    //ajouter dans le json des variables pour choisir le tri ou non (prix/date/null) puis le sens croissant/decroissant (1/-1)

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des évènements filtrés." });
  }
});*/


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

/* Suppression d'un évènement */
router.post('/delete/:idEvent', async (req, res) => {

  try {
    Event.deleteById(req.params.idEvent)
      .then(console.log);
    res.status(200).json({ message: "L'évènement a été supprimé avec succès."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'évènement." });
  }
});
module.exports = router;
