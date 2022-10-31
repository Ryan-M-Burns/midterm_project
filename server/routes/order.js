const express = require('express');
const db = require('../../db/connection');
const router  = express.Router();
const userQueries = require('../../db/queries/dbhelpers');
const twilio = require('../routes/twilio')

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
  userQueries.getCartIdByUserId(req.body['val'])
  .then((cart_id) => {
    const insertInfo = {
      'cart_id': cart_id['id'],
      'user_id': req.body['val']
    };
  return userQueries.orderConfirmation(insertInfo)
  })
  .then((infoReceived) => {
    res.json({ infoReceived });
    twilio.sendOrderPlaced();
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
