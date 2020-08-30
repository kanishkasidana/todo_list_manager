const { Task } = require("../models/task-model");
const path = require('path');

const saveTask = (req, res) => {
  console.log("req.body", req.body);
  console.log("req.files", req.files);
  // const url = req.protocol + '://' + req.get('host')
  var task = JSON.parse(req.body.data);
  // let pathUrl = url+ '/uploads/' + req.file.filename;
  task.attachment = req.file.filename;

  if (task._id) {
    console.log("task edit", task);
    Task.updateOne({ _id: task._id }, task)
      .then((result) => {

        console.log("task updated successfully", result);

        res.json({ "success": true, "msg": "Task updated successfully" });
      })
      .catch((err) => {
        console.log("error creating user", err);
        res.json({ "success": false, "err": "Something went wrong. Please try again later" });
      })
  } else {
    console.log("task add", task);
    Task.create(task)
      .then((result) => {

        console.log("task created successfully", result);

        res.json({ "success": true, "msg": "Task created successfully" });
      })
      .catch((err) => {
        console.log("error creating user", err);
        res.json({ "success": false, "err": "Something went wrong. Please try again later" });
      })
  }
}

const getAllTasks = (req, res) => {
  console.log("req.params", req.params.type);
  let whereCondition = { isDeleted: false };
  if (req.params.type === 'archive') {
    whereCondition.isArchived = true;
  } else {
    whereCondition.isArchived = false;
  }
  Task.find(whereCondition).sort({ priority: 1 })
    .then((result) => {

      console.log("get  all tasks", result);
      let tasksWithUpdatedColors = result.map((task) => {
        if (task.priority === '1') {
          task.color = 'red';
          task.priority = "High";
        } else if (task.priority === '2') {
          task.color = 'orange';
          task.priority = "Medium";
        } else if (task.priority === '3') {
          task.color = 'green';
          task.priority = "Low";
        }
        console.log("task", task);
        return task;
      });

      console.log("tasksWithUpdatedColors", tasksWithUpdatedColors);

      res.json({ "success": true, "msg": "", "data": tasksWithUpdatedColors });
    })
    .catch((err) => {
      console.log("error creating user", err);
      res.json({ "success": false, "err": "Something went wrong. Please try again later" });
    })
}

const deleteTask = (req, res) => {
  console.log("req.body", req.body);
  let dataObj = req.body;
  Task.updateOne({ _id: dataObj.id }, { isDeleted: true })
    .then((result) => {

      console.log("task deleted successfully", result);

      res.json({ "success": true, "msg": "Task deleted successfully" });
    })
    .catch((err) => {
      console.log("error creating user", err);
      res.json({ "success": false, "err": "Something went wrong. Please try again later" });
    })
}

const getTaskById = (req, res) => {
  console.log("req.body", req.body);

  Task.findOne({ _id: req.body.id })
    .then((result) => {

      console.log("get task by id", result);

      res.json({ "success": true, "msg": "", "data": result });
    })
    .catch((err) => {
      console.log("error creating user", err);
      res.json({ "success": false, "err": "Something went wrong. Please try again later" });
    })
}

const archiveTask = (req, res) => {
  console.log("req.body", req.body);
  let dataObj = req.body;
  let updateObj = {}
  if (dataObj.type === 'archive') {
    updateObj = { isArchived: true }
  } else if (dataObj.type === 'un-archive') {
    updateObj = { isArchived: false }
  }

  Task.updateOne({ _id: dataObj.id }, updateObj)
    .then((result) => {

      // console.log("task archived", result);
      let msg = dataObj.type === 'archive' ? "Task archived" : "Task Un-archived";
      res.json({ "success": true, "msg": msg });
    })
    .catch((err) => {
      console.log("error creating user", err);
      res.json({ "success": false, "err": "Something went wrong. Please try again later" });
    })
}

const downloadFile = ((req, res) => { // this routes all types of file
  console.log("req.body", req.body);
  var data = req.body;

  let uploadFolder = '../server/uploads/';

  var abpath = path.join(uploadFolder + data.filename);
  console.log("abpath", abpath);

  res.download(abpath, (err) => {
    if (err) {
      console.log(err);
    }
  })

});

module.exports = {
  saveTask: saveTask,
  getAllTasks: getAllTasks,
  deleteTask: deleteTask,
  getTaskById: getTaskById,
  archiveTask: archiveTask,
  downloadFile: downloadFile
}