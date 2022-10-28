const express = require('express');
const db = require('../../db/connection');
const router  = express.Router();
const userQueries = require('../../db/queries/dbhelpers');

router.get('/', (req, res) => {
  const userId = req.cookies['user_id']; // user_id = 1;
  return userQueries.placeOrder(userId)
    .then((infoReceived) => {
      res.json({ infoReceived }) //array-inside multiple objects
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const insertInfo = {
    'quantity': 15, //should come from browser/req.body
    'cart_id': 1,  // should come from browser/req.body
    'menu_item_id': 7, // should come from browser/req.body
    'note': null,
    'user_id': 1
  };
  return userQueries.orderConfirmation(insertInfo)
    .then((infoReceived) => {
      res.json({ infoReceived })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
