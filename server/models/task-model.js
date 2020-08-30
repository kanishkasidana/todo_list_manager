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
    type: String
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  color: {
    type: String
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  attachment: {
    type: String
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