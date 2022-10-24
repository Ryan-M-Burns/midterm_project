const express = require('express');
const db = require('../../db/connection');
const router  = express.Router();
const userQueries = require('../../db/queries/dbhelpers');

router.get('/', (req, res) => {
  const insertInfo = {
    'user_id': 1, //should come from browser/req.body
    'cart_id': 1, // should come from browser/req.body
  };
  userQueries.getCarts(insertInfo)
  .then((varInputs) => {
    const cartAllItems = [];
    for (const varInput of varInputs) {
      console.log("varInput", varInput);

    }
    res.json({ varInputs });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

router.post('/', (req, res) => {
  const insertInfo = {
    'quantity': 1, //should come from browser/req.body
    'cart_id': 1,  // should come from browser/req.body
    'menu_item_id': 1 // should come from browser/req.body
  };
  userQueries.addCartItems(insertInfo)
  .then(() => {
    const insertInfoTwo = {
      'user_id': 1, //should come from browser/req.body
      'cart_id': 1, // should come from browser/req.body
    };
    userQueries.getCarts(insertInfoTwo)
    .then((varInput) => {
      res.json({ varInput });
    })
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

router.post('/delete', (req, res) => {
  const insertInfo = {
    'cart_items.id': 18 //should come from browser/req.body
  }
  return userQueries.deleteCartItems(insertInfo)
    .then((infoReceived) => {
      res.json({ infoReceived })
    })
})

module.exports = router;
