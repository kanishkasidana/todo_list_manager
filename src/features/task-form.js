import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serviceHost } from '../config/const';
import { useHistory } from 'react-router-dom';

function TaskForm(props) { 
const [task, setTask] = useState({});
const [statusArr] = useState([
  { name: 'todo', displayName: 'ToDo' },
  { name: 'in-progress', displayName: 'In Progress' },
  { name: 'completed', displayName: 'completed' },
])
const [priorityArr] = useState([
  { name: '1', displayName: 'High', color: 'red' },
  { name: '2', displayName: 'Medium', color: 'orange' },
  { name: '3', displayName: 'Low', color: 'yellow' },
])
const [loading, setLoading] = useState(false);
const history = useHistory();

useEffect(() => {
  console.log("props", props);

  if (props.taskId) {
    getTaskById(props.taskId);
  }
}, [props]);

const getTaskById = (taskId) => {
  setLoading(true);
  let dataObj = {
    id: taskId
  }
  axios.post(serviceHost + '/task/getTaskById', dataObj)
    .then((response) => {
      if (response.data.success === true) {
        // alert(response.data.msg);
        setLoading(false);
        setTask(response.data.data);
      }

    })
    .catch((err) => {
      setLoading(false);
      console.log("err", err);
    })
}

const handleInputChange = (e) => {
  const { name, value } = e.target;

  setTask({ ...task, [name]: value })
}

const submitTask = (e) => {
  e.preventDefault();
  saveTask(task);
}

const saveTask = (task) => {
  console.log("task", task);
  setLoading(true);
  axios.post(serviceHost + '/task/save', task)
    .then((response) => {
      if (response.data.success === true) {
        alert(response.data.msg);
        setLoading(false);
        setTask({});

        history.push('/all-tasks');
      }

    })
    .catch((err) => {
      setLoading(false);
      console.log("err", err);
    })
}


return (
  <>
    <div className="container">
      <div className="well">
        {loading && <div className="loader" >
          <img src="/img/loader.gif" alt=""></img>
        </div>}
        <h5>{task._id ? 'Update' : 'Add'} Task</h5>
        <form style={{ marginTop: '20px' }}>
          <div className="row">
            <div className="col-sm-2 form-group">
              <label htmlFor="title">Task Title</label>
            </div>
            <div className="col-sm-6 form-group">
              <input type="text" name="title" value={task.title || ''} onChange={handleInputChange} className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 form-group">
              <label htmlFor="desc">Task Description</label>
            </div>
            <div className="col-sm-6 form-group">
              <input type="text" name="description" value={task.description || ''} onChange={handleInputChange} className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 form-group">
              <label htmlFor="status">Status</label>
            </div>
            <div className="col-sm-6 form-group">
              <select name="status" value={task.status || ''} onChange={handleInputChange} className="form-control">
                <option value="">Select Status</option>
                {
                  statusArr.map((status) => {
                    return <option key={status.name} value={status.name}>{status.displayName}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 form-group">
              <label htmlFor="priority">Priority</label>
            </div>
            <div className="col-sm-6 form-group">
              <select name="priority" value={task.priority || ''} onChange={handleInputChange} className="form-control">
                <option value="">Select Priority</option>
                {
                  priorityArr.map((priority) => {
                    return <option key={priority.name} value={priority.name}>{priority.displayName}</option>
                  })
                }
              </select>
            </div>
          </div>


          <button type="submit" style={{ marginTop: '10px' }} className="btn btn-primary" onClick={submitTask}>{task._id ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  </>
)
}

export default TaskForm;