const express = require('express');
const router  = express.Router();
const userQueries = require('../../db/queries/dbhelpers');

router.get('/', (req, res) => {
  userQueries.getAllMenuItems()
  .then((data) => {
    res.json({ data });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

router.get('/:id', (req, res) => {
  const inputVar = req.params.id;
  userQueries.getMenuItems(inputVar)
  .then((menuItem) => {
    res.json( menuItem );
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
