var jwt = require('jsonwebtoken');
const { tokenExpiryTime, secret } = require('../config/config');

const generateToken = (name) => {
    var token = jwt.sign({ id: name }, secret, {
        expiresIn: tokenExpiryTime
    });
    return token;
}

module.exports = {
    generateToken: generateToken
}