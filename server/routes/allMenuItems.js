const express = require('express');
const router  = express.Router();
const userQueries = require('../../db/queries/dbhelpers');

router.get('/', (req, res) => {
  userQueries.getAllMenuItems()
  .then(allMenuItems => {
    res.json({ allMenuItems });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

module.exports = router;
