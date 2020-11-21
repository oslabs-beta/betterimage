const express = require('express');
const imageController = require('../Controller/imageController.js')
const router = express.Router()


router.post('/convert', imageController.convertWebp,  (req, res, next) => {
  res.send("hi")
})
module.exports = router;