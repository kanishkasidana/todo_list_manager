
const {User} = require("../models/user-model");
const config = require("../config/config");
var bcrypt = require('bcrypt');

const createUser = (req, res) => {
  console.log("req.body", req.body);
  var usrObj = req.body;
  console.log("usrObj", usrObj);

  usrObj.password = bcrypt.hashSync(usrObj.password, config.noOfRound);

  console.log("usrObj", usrObj);
  User.create(usrObj)
    .then((user) => {

      console.log("user created successfully", user);
      // sendEmail(x.dataValues.email, x.dataValues.userName);
      res.json({ "success": true, "msg": "User created successfully" });
    })
    .catch((err) => {
      console.log("error creating user", err);
      res.json({ "success": false, "err": "Something went wrong. Please try again later" });
    })

}

module.exports = {
  createUser: createUser
}