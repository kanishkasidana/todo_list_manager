const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String,
  },
  status: {
    type: String
  },
  priority: {
    type: Number
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: String
  },
  createdOn: {
    type: Date,
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
  Task: mongoose.model('tasks', TaskSchema)
}