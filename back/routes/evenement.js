const express = require('express');
const User = require("../model/User");
const Event = require("../model/Event");
const router = express.Router();


/* Test ajout d'un évènement */
router.post('/add', async (req, res) => {
  try {
    await Event.addEvent(
      "65f45276023b80f8d23dc2cb",
      "event1",
      1,
      "imageEvent1.png",
      15,
      Date.now(),
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
  );
  } catch (error) {
    console.error(error);
  }
});

/* Test modification d'un évènement */
router.post('/:X/update', (req, res) => {
  try {
    Event.updateById(
      "65f46374dd94d0cf56ea39df",
      "65f45276023b80f8d23dc2cb",
      "event1",
      1,
      "imageEvent1.png",
      15,
      Date.now(),
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
    )
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
  //res.redirect('/categories');
});

/* Test suppression d'un évènement  */
router.post('/:X/delete', async (req, res) => {

  try {
    Product.deleteById(req.params.X)
      .then(console.log);
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
