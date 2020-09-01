const router = require('express').Router();
let Response = require('../models/response.model');

router.route('/').get((req, res) => {
  Response.find()
    .then(response => res.json(response))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const past = req.body.past;
  const future = req.body.future;
  const date = Date.parse(req.body.date);

  const newResponse = new Response({
    username,
    past,
    future,
    date,
  });

  newResponse.save()
  .then(() => res.json('Response added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/wti').get((req, res) => {
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


router.route('/:id').get((req, res) => {
  Response.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Response.findByIdAndDelete(req.params.id)
    .then(() => res.json('Response deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Response.findById(req.params.id)
    .then(response => {
      response.username = req.body.username;
      response.past = Number(req.body.past);
      response.future = Number(req.body.future);
      response.date = Date.parse(req.body.date);

    response.save()
      .then(() => res.json('Response updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
