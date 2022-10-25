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
    // const cartAllItems = [];
    // for (const varInput of varInputs) {
    //   console.log("varInput", varInput);
    // }
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
    'quantity': 15, //should come from browser/req.body
    'cart_id': 1,  // should come from browser/req.body
    'menu_item_id': 8, // should come from browser/req.body
    'note': null,
    'user_id': 1
  };
  userQueries.addCartItems(insertInfo)
    .then((varInput) => {
      res.json({ varInput });
    })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

router.post('/delete', (req, res) => {
  const insertInfo = {
    'quantity': 15, //should come from browser/req.body
    'cart_id': 1,  // should come from browser/req.body
    'menu_item_id': 7, // should come from browser/req.body
    'note': null,
    'user_id': 1
  }
  return userQueries.deleteCartItems(insertInfo)
    .then((infoReceived) => {
      res.json({ infoReceived })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

router.post('/update', (req, res) => {
  const insertInfo = {
    'quantity': 15, //should come from browser/req.body
    'cart_id': 1,  // should come from browser/req.body
    'menu_item_id': 1, // should come from browser/req.body
    'note': null,
    'user_id': 1
  };
  return userQueries.removeCartItems(insertInfo)
    .then((infoReceived) => {
      console.log('infoReceived', infoReceived)
      res.json({ infoReceived })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

module.exports = router;
