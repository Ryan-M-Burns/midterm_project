// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('../lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: path.resolve(__dirname, '../styles'),
    destination: path.resolve(__dirname, '../public/styles'),
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')));

// user login
app.get('/login/:id', (req, res) => {
  res.cookie('user_id', req.params.id);
  console.log('req.cookies', req.cookies)
  // send the user somewhere
  res.redirect('/');
});


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/menu', menuRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
