const express = require('express');
const app = express();
const path = require('path');
const webp = require('webp-converter');
const convertRouter = require(path.join(__dirname, './route/api.js'))
const bodyParser = require('body-parser')
const PORT = 9000;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '../public')))

app.use('/api', convertRouter)

app.get("/", function(req, res, next) { 
  res.send(path.resolve(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  const errorObj  = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).sendStatus(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`)
})

  module.exports = app;