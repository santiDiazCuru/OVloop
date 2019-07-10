const express = require("express");
const morgan = require("morgan");
const path = require('path');
const router = require("../src/routes/index.routes");
// const db = require('../db/models').db
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// EXPRESS EJECUTION
const app = express();

// MONGOOSE SETTINGS (DEPRECATIONS)
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

// CONNECT TO DB
mongoose.connect("mongodb://mongo:27017/ovloop")
    .then(() => console.log('mongoDB connected to ovloop'))
    .catch(err => console.log('db error: ', err));

// SETTTINGS
app.set("port", process.env.PORT || 8080);

// MIDDLEWARES
app.use(express.static(path.join(__dirname, '../src/public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use("/", router);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/public', 'index.html'));
})

const server = app.listen(app.get('port'), () => {
    console.log('App running in port ', app.get('port'))
});

module.exports = app;