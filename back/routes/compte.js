const express = require('express');
const User = require('../model/User');
const router = express.Router();


/* Ajout d'un utilisateur */
router.post('/new', async (req, res) => {
  try {
    await User.validateEmail(req.body.mail);
    await User.addUser(
      req.body.nom_utilisateur,
      req.body.nom,
      req.body.prenom,
      req.body.mail,
      req.body.admin,
      req.body.image,
      req.body.date_naissance,
      req.body.mdp
    );
    res.status(200).send("L'utilisateur a été ajouté avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de l'utilisateur." });
  }
});

/* Modification d'un utilisateur */
router.post('/:idUser/update', async (req, res) => {
  try {
    await User.validateEmail(req.body.mail);
    await User.updateById(
      req.params.idUser,
      req.body.nom_utilisateur,
      req.body.nom,
      req.body.prenom,
      req.body.mail,
      req.body.admin,
      req.body.image,
      req.body.date_naissance
    );
    res.status(200).send("L'utilisateur a été mis à jour avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'utilisateur." });
  }
});

/* Récupération d'un utilisateur selon son id */
router.get('/:idUser', async (req, res) => {
  try {
    const user = await User.getById(req.params.idUser);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'utilisateur." });
  }
});


module.exports = router;
