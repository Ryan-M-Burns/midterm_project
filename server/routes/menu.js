const express = require('express');
const router  = express.Router();
const userQueries = require('../../db/queries/dbhelpers');

router.get('/', (req, res) => {
  userQueries.getAllMenuItems()
  .then((allMenuItems) => {
    const feature_items = [];
    for(const allMenuItem of allMenuItems) {
      const test = allMenuItem.feature_item;
      if(test) {
        console.log(allMenuItem, "allMenuItem")
        feature_items.push(allMenuItem);
      }
    };
    res.json({ feature_items });
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
    res.json({ menuItem });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
