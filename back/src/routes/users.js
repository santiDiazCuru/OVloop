const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const User = require('../models/user')
const passport = require('../../passport/config')

//router.post('/login', usersController.fetchUser)

//genera admin para testear
// router.get('/', (req,res)=> {
//     User.create({username: 'admin', password: 'admin'})
//     .then((user)=>res.json(user))
// })


//PASSPORT 
router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('soy el user que se loggead perrooo', req.user)
    res.send(req.user)
})

router.get("/session", function (req, res) {
    console.log('hola soy req.user', req.user)
   req.user ? res.json(true) : res.json(false)
});

router.get("/logout", function (req, res) {
    req.session.destroy();
    res.send(200)
});


module.exports = router

