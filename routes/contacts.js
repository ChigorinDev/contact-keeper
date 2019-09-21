const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//import user Schema to interract with the server
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route  GET  api/contacts
//@desc  Get all users contacs
//@acces  Private
router.get('/', auth, async (req, res) => {
  try {
    // date: -1 gives the most recent contacts first
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });

    // Return contacts object
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/contancs
//@desc   Add new contact
//@acces  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Names is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      // Create contact instance
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      //Save contact instance to db
      const contact = await newContact.save();
      // Return saved contact to the client
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  PUT api/contacts/:id
//@desc   Update contact
//@acces  Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  DELETE api/contacts/:id
//@desc   Delete contact
//@acces  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!!!');
  }
});

module.exports = router;
