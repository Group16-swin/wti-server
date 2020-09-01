const router = require('express').Router();
let Wti = require('../models/wti.model');

router.route('/').get((req, res) => {
  Wti.find()
    .then(response => res.json(response))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
Wti.aggregate([{
  $group: {
      _id: "$username",
      year: {
          $avg: {
              $cond: [{
                      $gte: ["$date", new Date(new Date() - (1000 * 60 * 60 * 24 * 365))]
                  },
                  "$past",
                  null
              ]
          }
      },
      month: {
          $avg: {
              $cond: [{
                      $gte: ["$date", new Date(new Date() - (1000 * 60 * 60 * 24 * 30))]
                  },
                  "$past",
                  null
              ]
          }
      },
      week: {
          $avg: {
              $cond: [{
                      $gte: ["$date", new Date(new Date() - (1000 * 60 * 60 * 24 * 7))]
                  },
                  "$past",
                  null
              ]
          }
      },
  }
}])
  .then(response => res.json(response))
  .catch(err => res.status(400).json('Error: ' + err));
  //console.log(res);
});

module.exports = router;
