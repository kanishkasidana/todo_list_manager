const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../server/config/config');
const cors = require('cors');
const path = require("path");

var authRoute = require('./routes/auth-route');
var userRoute = require('./routes/user-route');
var taskRoute = require('./routes/task-route');

const passport = require('passport');
require('./passport');

mongoose.connect(config.db, {
  socketTimeoutMS: 0,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to the database."))
  .catch((err) => console.log(err));

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

var port = config.serverPort;



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/', authRoute);
app.use('/api/user', userRoute);
app.use('/api/task', taskRoute);


// error handling
app.use((err, req, res, next) => {
  console.log(err);
  if (res.headersSent) return next(err);
  res.status(400).json({
    err: err
  });
});

app.listen(port, function () {
  console.log('server running at ' + port)
  console.log(`Listening on port ${port}`);
});