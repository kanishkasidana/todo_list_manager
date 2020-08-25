var express = require('express');
var router = express.Router();
const taskController = require('../controllers/task-controller');

router.post('/save', taskController.saveTask);

router.get('/getAllTasks/:type', taskController.getAllTasks);

router.post('/deleteTask', taskController.deleteTask);

router.post('/getTaskById', taskController.getTaskById);

router.post('/archiveTask', taskController.archiveTask);


module.exports = router;