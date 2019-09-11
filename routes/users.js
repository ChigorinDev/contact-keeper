const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//import user Schema to interract with the server
const User = require('../models/User');

//@route  POST  api/users
//@desc   Register a user
//@acces  Public
router.post(
  '/',
  //middleware goes here to validate data
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more chars').isLength({
      min: 6
    })
  ],
  (req, res) => {
    const errors = validationResult(req);
    //check if errors is empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('passed');
  }
);

module.exports = router;
