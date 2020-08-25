const { Task } = require("../models/task-model");

const saveTask = (req, res) => {
  console.log("req.body", req.body);
  var task = req.body;
  if (task._id) {

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
    console.log("task", task);
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
  Task.find({ isDeleted: false })
    .then((result) => {

      console.log("get  all tasks", result);

      res.json({ "success": true, "msg": "", "data": result });
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

module.exports = {
  saveTask: saveTask,
  getAllTasks: getAllTasks,
  deleteTask: deleteTask
}