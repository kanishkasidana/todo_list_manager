const passport = require('passport');
var Strategy = require('passport-local').Strategy;
const { User } = require('./models/user-model')
var bcrypt = require('bcrypt');

passport.use(new Strategy(
    function (username, password, done) {
        console.log('username', username);
        console.log("password", password);
        console.log("uSER MODEL", User);
        User.findOne({
            "email": username   
        }).then(user => {
            if (user) {
                console.log("user", user);
                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) {
                        console.log(err, "passport err");
                        return done(null, false);
                    }
                    else {
                        if (res === false) {
                            return done(null, false);
                        }
                        else {
                            return done(null, user);
                        }
                    }
                });
            }
            else {
                return done(null, false);
            }
        }).catch(err => {
            logError(err, "passport err");
        })
    }));

