const express = require('express');
const User = require('../model/User');
const Event = require('../model/Event');
const router = express.Router();


/* Ajout d'un utilisateur */
router.post('/new', async (req, res) => {
  try {
    await User.validateEmail(req.body.mail);
    User.addUser(
      req.body.nom_utilisateur,
      req.body.nom,
      req.body.prenom,
      req.body.mail,
      req.body.admin,
      req.body.image,
      req.body.date_naissance,
      req.body.mdp)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Modification d'un utilisateur */
router.post('/:idUser/update', async (req, res) => {
  try {
    await User.validateEmail(req.body.mail);
    User.updateById(
      req.params.idUser,
      req.body.nom_utilisateur,
      req.body.nom,
      req.body.prenom,
      req.body.mail,
      req.body.admin,
      req.body.image,
      req.body.date_naissance)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
