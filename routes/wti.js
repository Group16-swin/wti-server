const router = require('express').Router();
let Wti = require('../models/wti.model');

router.route('/').get((req, res) => {
  Wti.find()
    .then(wti => res.json(wti))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const id = req.body.id;
  const wti = Number(req.body.wti);


const newWti = new Wti({
  id,
  wti,
});

newWti.save()
  .then(() => res.json('Wti added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/year/:id').get((req, res) => {
Wti.aggregate([{
    $match: {
        username: {
            $eq: req.params.id
        }
    }
}, {
    $match: {
        date: {
            $gte: new Date(new Date() - (1000 * 60 * 60 * 24 * 365)),
            $lte: new Date()
        }
    }
}, {
    $group: {
        _id: "$username",
        past: {
            $avg: "$past"
        }
    }
}])
  .then(wti => res.json(wti))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/month/:id').get((req, res) => {

Wti.aggregate([{
    $match: {
        username: {
            $eq: req.params.id
        },
        date: {
            $gte: new Date(new Date() - (1000 * 60 * 60 * 24 * 30)),
            $lte: new Date()
        }
    }
}, {
    $group: {
        _id: "$username",
        past: {
            $avg: "$past"
        }
    }
}])

  .then(wti => res.json(wti))
  .catch(err => res.status(400).json('Error: ' + err));
  console.log(res)
});

router.route('/week/:id').get((req, res) => {
Wti.aggregate([{
    $match: {
        username: {
            $eq: req.params.id
        }
    }
}, {
    $match: {
        date: {
            $gte: new Date(new Date() - (1000 * 60 * 60 * 24 * 7)),
            $lte: new Date()
        }
    }
}, {
    $group: {
        _id: "$username",
        past: {
            $avg: "$past"
        }
    }
}])
  .then(wti => res.json(wti))
  .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
