const express = require("express");
const imageController = require("../Controller/imageController.js");
const router = express.Router();

router.post("/convert", imageController.convertWebp, (req, res, next) => {
  console.log(res.locals.instance);
  res.status(200).json(res.locals.instance);
});
module.exports = router;

