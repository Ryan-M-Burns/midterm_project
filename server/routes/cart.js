const express = require('express');
const db = require('../../db/connection');
const router = express.Router();
const userQueries = require('../../db/queries/dbhelpers');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

router.get('/:id', (req, res) => {
  const userID = Number(req.cookies['user_id']);

  userQueries.getCartItems(userID)
    .then(cart => {
      res.json({ cart });
    })
    .catch(e => res.send(e));

});

router.post('/:id/delete', (req, res) => {
  return userQueries.removeCartItems(Number(req.body.id))
  .then(res => res.rows)
  .catch(e => console.error(e));
});

router.post('/:id', (req, res) => {
  const userID = Number(req.cookies['user_id']);

  userQueries.getCartIdByUserId(userID)
    .then(cartID => {
      const insertInfo = {
        cart_id: cartID.id,
        menu_item_id: req.body.menu_item_id,
        note: req.body.note,
        quantity: req.body.quantity,
        user_id: userID
      };
      userQueries.addCartItems(insertInfo)
        .then((varInput) => {
          res.json({ varInput });
        });
    }).catch(e => res.send(e));

});

router.get('/', (req, res) => {
  const userID = req.cookies['user_id'];

  const insertInfo = {
    'user_id': userID,
  };
  userQueries.getCarts(insertInfo)
    .then((varInputs) => {
      res.json({ varInputs });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  let getMenuId;
  let getCartId;
  const selectedName = Object.keys(req.body)[0];
  userQueries.getMenuIdByName(selectedName)
    .then((val1) => {
      getMenuId = val1[0]['id'];
      return userQueries.getCartIdByUserId(Number(req.cookies['user_id']));
    })
    .then((val2) => {
      getCartId = val2[0]['id'];
    })
    .then(() => {
      const insertInfo = {
        'quantity': 1, //should come from browser/req.body
        'cart_id': getCartId,
        'menu_item_id': getMenuId,
        'note': null,
        'user_id': Number(req.cookies['user_id'])
      };

      return userQueries.addCartItems(insertInfo)
        .then((varInput) => {
          res.json({ varInput });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
});

//Pseudo-code

// router.post('/update', (req, res) => {
// const cart = req.cart_id;

//   if (qty = 0) {
//     return userQueries.removeCartItems(cart_id)
//       .then(res => res.rows)
//   .catch(e => console.error(e));
//   }
//     return userQueries.updateCartItems(cart_id)
//     .then(res => res.rows)
//     .catch(e => console.error(e));
// });

module.exports = router;
