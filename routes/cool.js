const express = require('express');
const cool = express.Router();

cool.get('/', (req, res) => {
  return res.send('You are so cool')
})

module.exports = cool;