const express = require('express');
const Snippet = require('../models/Snippet');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const fetchuser = require('../database/fetchuser');

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

module.exports = router