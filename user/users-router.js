const router = require('express').Router()
const jwt = require('jsonwebtoken');
const Users = require('./users-model.js');
const { restricted, validateUserId, validateSleepEntry } = require('../auth/authenticate-middleware');

router.post('/:id/sleeptracker', validateUserId, (req, res) => {
  const user_id = req.body.user_id
  if(req.params.id == user_id) {
    Users.addSleepEntry(req.body)
    .then(sleepentry => {
      res.status(200).json(sleepentry);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "API Error", error: err.message});
    });
  } else {
    res.status(404).json({
      message: "You cannot update this entry. Incorrect User ID in body or URL"
    });
  }
});

router.get('/:id/sleeptracker', validateUserId, (req, res) => {
  Users.findSleepListById(req.params.id)
  .then(sleeplist => {
    res.status(200).json(sleeplist);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "API Error", error: err.message})
  });
});

router.get('/:id/sleeptracker/:sleepid', validateUserId, validateSleepEntry, (req, res) => {
  Users.findSleepEntryById(req.params.id, req.params.sleepid)
  .then (sleepentry => {
    res.status(200).json(sleepentry)
  })
})

router.put('/:id/sleeptracker/:sleepid', validateUserId, validateSleepEntry, (req, res) => {
  const changes = req.body;
  const user_id = req.body.user_id;
  if(req.params.id == user_id) {
    Users.updateSleepEntry(req.params.id, req.params.sleepid, changes)
    .then(post => {
      if (post) {
        res.status(200).json({changes, sleepid: req.params.sleepid});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "API Error", error: err.message })
    })
  } else {
    res.status(401).json({
      message: "You cannot update this entry. Incorrect User ID in body or URL"
    });
  }
})

router.delete('/:id/sleeptracker/:sleepid', validateUserId, validateSleepEntry, (req, res) => {
  Users.removeSleepEntry(req.params.id, req.params.sleepid)
  .then(count => {
    if (count > 0) {
      res.status(200).json({message: 'The entry has been removed'});
    } else {
      res.status(404).json({message: 'The entry could not be removed'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "API Error", error: err.message})
  })
})

module.exports = router
