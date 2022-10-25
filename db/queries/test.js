const db = require('../connection');

const insertInfo = {
  'quantity': 15, //should come from browser/req.body
  'cart_id': 1,  // should come from browser/req.body
  'menu_item_id': 1, // should come from browser/req.body
  'note': null,
  'user_id': 1
};


const orderConfirmation = (insertInfo) => {
  let inputArr = [];
  let orderNum;
  db.query('INSERT INTO orders(price, cart_id) SELECT price, carts.id FROM carts WHERE carts.id = $1;', [insertInfo['cart_id']])
  return db.query(
    'SELECT cart_items.*, orders.id FROM cart_items JOIN carts ON carts.id = cart_items.cart_id JOIN orders ON carts.id = orders.cart_id WHERE orders.cart_id = $1;',
    [insertInfo['cart_id']]
  )
  .then((data) => {
    return data.rows;
  })
  .then((dataTwos) => {
    for (const dataTwo of dataTwos) {
      const inputObj = {
        'quantity': dataTwo['quantity'],
        'menu_item_id': dataTwo['menu_item_id'],
        'note': dataTwo['note'],
        'orders.id': dataTwo['id']
      };
      inputArr.push(inputObj);
    }
    orderNum = inputArr[0];
    return inputArr;
  })
  .then((dataThrees) => {
    for (const dataThree of dataThrees) {
      db.query('INSERT INTO order_items (quantity, menu_item_id, note, order_id) VALUES ($1, $2, $3, $4);',
      [dataThree['quantity'], dataThree['menu_item_id'], dataThree['note'], dataThree['orders.id']])
    }
    db.query(
      'DELETE FROM carts WHERE carts.id = $1;',
      [insertInfo['cart_id']]
    )
  })
  .then(() => {
    db.query('SELECT orders.*, order_items.* FROM orders JOIN order_items ON order_id = orders.id WHERE orders.id = $1', [orderNum['orders.id']])
  })
}

orderConfirmation(insertInfo);


