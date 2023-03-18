const express = require('express');
const Snippet = require('../models/Snippet');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const fetchuser = require('../database/fetchuser');
const { now } = require('mongoose');

router.get('/getByUser', fetchuser, async (req, res) => {
  try {
    const codes = await Snippet.find({ user: req.user.id });
    res.json(codes)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.post('/add', fetchuser, [
  body('code', 'Code cannot be blank').exists()
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    const snippet = await Snippet.create({
      user: req.user.id,
      code: req.body.code
    });

    success = true

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.put('/update/:id', fetchuser, async (req, res) => {
  const { code } = req.body;
  try {
    // Create a newNote object
    const newCode = {};

    newCode.code = code;
    newCode.date = now()

    let excode = await Snippet.findById(req.params.id);

    if (!excode)
      return res.status(404).send("Not Found");

    if (excode.user.toString() !== req.user.id)
      return res.status(401).send("Not Allowed");

    excode = await Snippet.findByIdAndUpdate(req.params.id, { $set: newCode }, { new: true });
    res.json({ excode });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

module.exports = router