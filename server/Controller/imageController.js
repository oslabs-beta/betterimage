const fs = require("fs");
const path = require("path");
const webp = require("webp-converter");
const imageController = {};

imageController.convertWebp = async (req, res, next) => {
  const { imageName, imgType, quality } = req.body;
  console.log("conversion to webp triggered");

  const result = await webp.cwebp(
    path.resolve(__dirname, `../../src/components/App/images/${imageName}.${imgType}`),
    path.resolve(__dirname, `../../src/components/BetterImage/convertedImage/${imageName}.webp`),
    `-q ${quality}`
  );
  res.locals.instance = true;
  return next();
};

module.exports = imageController;
