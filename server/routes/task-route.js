var express = require('express');
var router = express.Router();
const taskController = require('../controllers/task-controller');
let multer = require('multer');

const DIR = '../server/uploads/';

var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      console.log("file", file);
      let curDate = new Date();
      let curTime_ = curDate.getTime();
      let filename = curTime_ + file.originalname;
      let final_fileName = filename.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '_');

      cb(null, final_fileName)
    }
  }),
});

router.post('/save', upload.single('attachment'), taskController.saveTask);

router.get('/getAllTasks/:type', taskController.getAllTasks);

router.post('/deleteTask', taskController.deleteTask);

router.post('/getTaskById', taskController.getTaskById);

router.post('/archiveTask', taskController.archiveTask);

router.post('/downloadFile', taskController.downloadFile);


module.exports = router;