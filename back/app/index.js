const express = require("express");
const morgan = require("morgan");
const path = require('path');
const router = require("../src/routes/index.routes");
const db = require('../db/models').db
const app = express();
const bodyParser = require('body-parser');

// Db connection

// Settings
app.set("port", process.env.PORT || 8080);

// MIDDLEWARES
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/", router);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
})

app.listen(8080, ()=>{
    console.log('APP LISTEN IN PORT 8080')
})


module.exports = app;