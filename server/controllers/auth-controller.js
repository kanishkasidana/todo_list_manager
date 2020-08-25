const passport = require('passport');
const { generateToken } = require('../config/common')

const login = (req, res) => {
  passport.authenticate('local', { session: false }, async (x, usr) => {
    if (usr) {
      console.log("usr", usr);
      const token = generateToken({ userId: usr._id, email: usr.email });
      console.log(usr.email, + " login user authentication email");
      console.log(+ "login user authentication filename");
      res.set('token', token);
      res.json({ "success": true, "token": token, "userId": usr._id, "email": usr.email });
    }
    else {
      console.log(" loginInvalid user credentials");

      res.json({ "success": false, "token": "", "err": "Invalid user credentials" });
    }
  })(req, res);
}

module.exports = {
  login: login
}