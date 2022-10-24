const db = require('../connection');

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

const getAllMenuItems= () => {
  return db.query('SELECT * FROM menu_items;')
    .then((data) => {
      return data.rows;
    });
};

const getMenuItems= (inputVar) => {
  return db.query('SELECT * FROM menu_items WHERE id = $1;', [inputVar])
    .then((data) => {
      return data.rows;
    });
};

const getCarts = (insertInfo) => {
  return db.query(
    'SELECT carts.*, cart_items.*, menu_items.* FROM carts JOIN cart_items ON carts.id = cart_id JOIN users ON users.id = user_id JOIN menu_items on menu_items.id = menu_item_id WHERE user_id = $1 AND carts.id = $2;',
    [insertInfo['user_id'], insertInfo['cart_id']])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log("err", err.message);
    })
};

const addCartItems = (insertInfo) => {
  return db.query(
    'INSERT INTO cart_items(cart_id, quantity, menu_item_id) VALUES ($1, $3, $2);',
    [insertInfo['cart_id'], insertInfo['menu_item_id'], insertInfo['quantity']])
}





module.exports = { getUsers, getRestaurants, getAllMenuItems, getMenuItems, getCarts, addCartItems };
