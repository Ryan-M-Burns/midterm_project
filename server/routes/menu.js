const express = require('express');
const router  = express.Router();
const userQueries = require('../../db/queries/dbhelpers');

router.get('/', (req, res) => {
  userQueries.getAllMenuItems()
  .then((allMenuItems) => {
    let items = {};
    let feature_items = [];
    for(const allMenuItem of allMenuItems) {
      if(allMenuItem.feature_item) {
        feature_items.push(allMenuItem);
      }
    };
    items["feature_items"] = feature_items;
    for(const allMenuItem of allMenuItems) {
      let curr_type = allMenuItem['type'];
      if(items.hasOwnProperty(curr_type)) {
        items[curr_type].push(allMenuItem);
      } else {
        items[curr_type] = [allMenuItem];
      }
    };
    return items;
  })
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
    res.json({ menuItem });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
