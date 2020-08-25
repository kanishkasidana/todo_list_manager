var express = require('express');
var router = express.Router();
const taskController = require('../controllers/task-controller');


router.post('/save', taskController.saveTask);

router.get('/getAllTasks', taskController.getAllTasks);

router.post('/deleteTask', taskController.deleteTask);


module.exports = router;