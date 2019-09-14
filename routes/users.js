const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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
  async (req, res) => {
    const errors = validationResult(req);
    //check if errors is empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Grab the data from request
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      //Check If the user is already exists
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      //Create a new instance of a user
      user = new User({
        name: name,
        email: email,
        password: password
      });

      const salt = await bcrypt.genSalt(10);
      //take that salt and hash the password before passing to the server
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // res.send('User saved');
      //Payload fot jwt
      const payload = { id: user.id };

      //Creating jwt sign() takes payload, a secret, {options} and callback function
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          //Options for jwt
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
