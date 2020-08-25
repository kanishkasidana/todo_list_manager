const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  displayName: {
    type: String,
    index: { unique: true }
  },
  createdBy: {
    type: String
  },
  createdOn: {
    type: String,
    default: Date.now
  },
  modifiedBy: {
    type: String
  },
  modifiedOn: {
    type: String,
    default: Date.now
  },
},
  { versionKey: false });

module.exports = {
  User: mongoose.model('users', UserSchema)
}   