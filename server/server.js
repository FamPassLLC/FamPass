const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');

// require in routers

const usersRouter = require('../server/routes/users');
const servicesRouter = require('../server/routes/services');
const familiesRouter = require('../server/routes/families');

const app = express();

// parse request body later
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes for users creation and verification (login page)

app.use('/api/users', usersRouter);

// routes for handling login info for services
app.use('/api/services', servicesRouter);

// routes for handling requests regarding family composition
app.use('/api/families', familiesRouter);

// middleware for page not found
app.use((req, res) => {
  res.status(404).send('Not found');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj);
  return JSON.stringify(res.status(errorObj.status).send(errorObj.message));
});

// get webpack
app.use('/build', express.static(path.join(__dirname, '../build')));

app.listen(3000, () => console.log('listening on port 3000...')); // listens on port 3000 -> http://localhost:3000/
