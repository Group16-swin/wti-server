const router = require('express').Router();
let Response = require('../models/response.model');

router.route('/').get((req, res) => {
  Response.find()
    .then(response => res.json(response))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/add').post((req, res) => {
//   const username = req.body.username;
//   const week = Number(req.body.week);
//   const month = Number(req.body.month);
//   const year = Number(req.body.year);
//
// const newResponse = new Response({
//   username,
//   week,
//   month,
//   year,
// });
//
// newResponse.save()
//   .then(() => res.json('Response added!'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });
//
// router.route('/:id').get((req, res) => {
//   Response.findById(req.params.id)
//     .then(response => res.json(response))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
//
// router.route('/:id').delete((req, res) => {
//   Response.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Response deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/wti/:id').get((req, res) => {
Response.aggregate([{
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
