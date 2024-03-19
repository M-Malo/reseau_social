const express = require('express');
const User = require('../model/User');
const Event = require('../model/Event');
const router = express.Router();


/* Test ajout d'un utilisateur */
router.post('/add', async (req, res) => {
  console.log("req.body.name");
  //console.log(req.body.name);
  try {
    User.addUser(
      "user3",
      "nom3",
      "prenom3",
      "user3.gmail.com",
      "false",
      "avatar3.png",
      "03-03-2003",
      "123456")
    //User.addUser("user2", "nom2", "prenom2", "user2.gmail.com", "false", "avatar2.png", "02-02-2002", "23456")
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});

/* Test modification d'un utilisateur */
router.post('/:X/update', (req, res) => {
  try {
    User.updateById(
      req.params.X,
      "user1",
      "nom1",
      "prenom1",
      "user1.gmail.com",
      "false",
      "avatar1.png",
      "01-01-2001",
      "12345")
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
