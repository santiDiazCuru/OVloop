//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport agains
var  User  = require('../src/models/user')

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
   console.log(User)
    cb(null, user);
});
//
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
//
// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log('entra al configggg', username, password)
        User.find({
                username: username,
                password: password
            
        }).then(function (dbUser) {
                return done(null, dbUser)
        });
    }
));
//
//
// Exporting our configured passport
module.exports = passport;