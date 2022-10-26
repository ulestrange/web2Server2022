const express = require('express');
const {logging1, logging2} = require('../middleware/logging')

const router = express.Router();

router.use(logging1);

router.get('/',  (req, res) => res.send('Hello World from Una!'))

router.use(logging2)

router.get('/bananas', (req, res) =>
  res.send('hello world, this is bananas'));


 module.exports = router;