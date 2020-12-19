const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const usersRouter = require('../server/routes/users');
//parse request body later
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);

//not found error handler
app.use((req, res) => {
  res.status(404).send('Not found');
});

//global error handler
app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj);
  return JSON.stringify(res.status(errorObj.status).send(errorObj.message));
});
app.use('/build', express.static(path.join(__dirname, '../build')));
app.listen(3000, () => console.log('listening on port 3000...')); //listens on port 3000 -> http://localhost:3000/
