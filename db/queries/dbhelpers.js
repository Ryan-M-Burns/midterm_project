const db = require('../connection');


//GET Info helpers
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then((data) => {
      return data.rows;
    });
};

const getRestaurants = () => {
  return db.query('SELECT * FROM restaurants;')
    .then((data) => {
      return data.rows;
    });
};

const getMenuIdByName = (selectedName) => {
  return db.query('SELECT menu_items.id FROM menu_items WHERE name = $1;', [selectedName])
    .then((data) => {
      return data.rows;
    });
};

const getcartIdByUserId = (userID) => {
  return db.query('SELECT carts.id FROM carts WHERE user_id = $1;', [userID])
    .then((data) => {
      return data.rows;
    });
};

//menu routes section
const getAllMenuItems = () => {
  return db.query('SELECT * FROM menu_items;')
    .then((data) => {
      return data.rows;
    })
    .then((allMenuItems) => {
      let items = {};
      let feature_items = [];
      for (const allMenuItem of allMenuItems) {
        if (allMenuItem.feature_item) {
          feature_items.push(allMenuItem);
        }
      };
      items["FEATURE_ITEMS"] = feature_items;
      for (const allMenuItem of allMenuItems) {
        let curr_type = allMenuItem['type'];
        if (items.hasOwnProperty(curr_type)) {
          items[curr_type].push(allMenuItem);
        } else {
          items[curr_type] = [allMenuItem];
        }
      };
      return items;
    });
};

const getMenuItems = (inputVar) => {
  return db.query('SELECT * FROM menu_items WHERE id = $1;', [inputVar])
    .then((data) => {
      return data.rows;
    });
};

//cart routes section
const getCartPrice = (insertInfo) => {
  return db.query('SELECT cart_id, SUM(menu_items.price * cart_items.quantity) AS total_price FROM carts JOIN cart_items on carts.id = cart_id JOIN menu_items ON menu_item_id = menu_items.id WHERE cart_id = $1 GROUP BY cart_id;',
    [insertInfo['cart_id']]
  )
    .then((data) => {
      return data.rows;
    });
};

const addCartItems = (insertInfo) => {
  db.query('SELECT quantity FROM cart_items WHERE cart_id = $1 AND menu_item_id = $2 AND ( note = $3 OR $3 IS NULL);', [insertInfo['cart_id'], insertInfo['menu_item_id'], insertInfo['note']])
    .then((data) => {
      if (Array.isArray(data.rows) && data.rows.length === 0) {
        return null;
      } else {
        const verifyInfos = data.rows;
        const verifyQuantity = verifyInfos[0]['quantity'];
        return verifyQuantity;
      }
    })
    .then((dataTwo) => {
      if (Number(dataTwo) > 0) {
        const updateValue = Number(dataTwo) + Number(insertInfo['quantity']);
        db.query('UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND menu_item_id = $3 AND ( note = $4 OR $4 IS NULL);', [updateValue, insertInfo['cart_id'], insertInfo['menu_item_id'], insertInfo['note']]);
      }
      if (Number(dataTwo === null)) {
        db.query('INSERT INTO cart_items (cart_id, menu_item_id, quantity, note) VALUES ($1, $2, $3, $4);',
          [insertInfo['cart_id'], insertInfo['menu_item_id'], insertInfo['quantity'], insertInfo['note']]);
      }
    });
  let dataOutput = [];
  return getCartPrice(insertInfo)
    .then((data) => {
      dataOutput.push(data);
      return getCarts(insertInfo);
    })
    .then((dataTwo) => {
      dataOutput.push(dataTwo);
      return dataOutput;
    });
};

const getCarts = (insertInfo) => {
  let dataOutput = [];
  return db.query(
    'SELECT cart_id, menu_item_id, SUM(quantity), note FROM carts JOIN cart_items ON carts.id = cart_id JOIN users ON users.id = user_id JOIN menu_items on menu_items.id = menu_item_id WHERE user_id = $1 AND carts.id = $2 GROUP BY menu_item_id, note, cart_id;',
    [insertInfo['user_id'], insertInfo['cart_id']])
    .then((data) => {
      return data.rows;
    })
    .then((dataTwo) => {
      dataOutput.push(dataTwo);
      return db.query('SELECT carts.*, cart_items.*, menu_items.* FROM carts JOIN cart_items ON carts.id = cart_id JOIN menu_items ON menu_items.id = menu_item_id WHERE user_id = $1 AND cart_id = $2;',
        [insertInfo['user_id'], insertInfo['cart_id']]);
    })
    .then((dataThree) => {
      dataOutput.push(dataThree);
      return dataOutput;
    })
    .catch((err) => {
      console.log("err", err.message);
    });
};

const getCartItems = (insertInfo) => {
  return db.query(
    `Select cart_items.*, carts.user_id as user_id
    FROM cart_items
    JOIN carts ON carts.id = cart_items.cart_id
    WHERE carts.user_id = $1;`,
    [insertInfo]
  )
    .then(data => {
      console.log(data);
    });
};

const removeCartItems = (insertInfo) => {
  db.query('SELECT quantity FROM cart_items WHERE cart_id = $1 AND menu_item_id = $2 AND ( note = $3 OR $3 IS NULL);', [insertInfo['cart_id'], insertInfo['menu_item_id'], insertInfo['note']])
    .then((data) => {
      if (Array.isArray(data.rows) && data.rows.length === 0) {
        return null;
      } else {
        const verifyInfos = data.rows;
        const verifyQuantity = verifyInfos[0]['quantity'];
        return verifyQuantity;
      }
    })
    .then((dataTwo) => {
      if (Number(dataTwo) - Number(insertInfo['quantity']) > 0) {
        const updateValue = Number(dataTwo) - Number(insertInfo['quantity']);
        db.query('UPDATE cart_items SET quantity = $1 WHERE menu_item_id = $2 AND note IS NULL;', [updateValue, insertInfo['menu_item_id']]);
      }
      if (Number(dataTwo) - Number(insertInfo['quantity']) === 0) {
        db.query('DELETE FROM cart_items WHERE menu_item_id = $1;', [insertInfo['menu_item_id']]);
      }
      if (Number(dataTwo) - Number(insertInfo['quantity']) < 0) {
        console.log('error');
      }
    });
  return getCarts(insertInfo);
};

const deleteCartItems = (insertInfo) => {
  let dataOutput = [];
  return db.query(
    'DELETE FROM cart_items WHERE menu_item_id = $1;',
    [insertInfo['menu_item_id']]
  )
    .then(() => {
      return getCartPrice(insertInfo);
    })
    .then((data) => {
      dataOutput.push(data);
      return getCarts(insertInfo);
    })
    .then((dataTwo) => {
      dataOutput.push(dataTwo);
      return dataOutput;
    })
    .catch((err) => {
      console.log("err", err.message);
    });
};

//order routes section
const placeOrder = (insertInfo) => {
  return db.query('SELECT cart_items.*, menu_items.* FROM cart_items JOIN menu_items ON menu_items.id = menu_item_id JOIN carts ON carts.id = cart_id WHERE user_id = $1;', [insertInfo])
    .then((data) => {
      return data.rows;
    });
};

const orderConfirmation = (insertInfo) => {
  let inputArr = [];
  let orderNum;
  db.query('INSERT INTO orders(price, cart_id) SELECT price, carts.id FROM carts WHERE carts.id = $1;', [insertInfo['cart_id']]);
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
          [dataThree['quantity'], dataThree['menu_item_id'], dataThree['note'], dataThree['orders.id']]);
      }
      db.query(
        'DELETE FROM carts WHERE carts.id = $1;',
        [insertInfo['cart_id']]
      );
    })
    .then(() => {
      return db.query('SELECT orders.*, order_items.* FROM orders JOIN order_items ON order_id = orders.id WHERE orders.id = $1', [orderNum['orders.id']]);
    })
    .then((dataFour) => {
      return dataFour.rows;
    });
};

module.exports = {
  getUsers,
  getRestaurants,
  getAllMenuItems,
  getMenuItems,
  getCarts,
  getCartItems,
  addCartItems,
  getCartPrice,
  removeCartItems,
  deleteCartItems,
  placeOrder,
  orderConfirmation,
  getMenuIdByName,
  getcartIdByUserId
};
