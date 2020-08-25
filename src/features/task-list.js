import React, { useState, useEffect } from 'react';
import TaskForm from './task-form';
import axios from 'axios';
import { serviceHost } from '../config/const';
import { useHistory } from 'react-router-dom';

function TaskList() {
  const [header, setHeader] = useState([
    { name: 'title', displayName: 'Task Title' },
    { name: 'description', displayName: 'Task Description' },
    { name: 'priority', displayName: 'Priority' },
    { name: 'status', displayName: 'Status' },
    { name: 'action', displayName: 'Action' },
  ])
  const history = useHistory();

  const [tasks, setTasks] = useState([
    // { id: 1, title: 'LEARN REACT', description: 'react ....', priority: 1, status: 'todo' },
    // { id: 2, title: 'LEARN Angular', description: 'anular ....', priority: 1, status: 'in-progress' },
  ])

  const [task, setTask] = useState({});
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    getAllTasks();
  }, [])

  const saveTask = (task) => {
    console.log("task", task);

    axios.post(serviceHost + '/task/save', task)
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.msg);
          setTask({});
          setShowAddTask(false);
          getAllTasks();
        }

      })
      .catch((err) => {
        console.log("err", err);
      })
  }

  const getAllTasks = () => {
    axios.get(serviceHost + '/task/getAllTasks')
      .then((response) => {
        if (response.data.success === true) {
          // alert(response.data.data);
          setTasks(response.data.data);
        }

      })
      .catch((err) => {
        console.log("err", err);
      })
  }

  const deleteTask = (taskId) => {
    console.log("taskId", taskId);
    // let updatedTasks = tasks.filter((task) => task.id !== taskId);

    // setTasks(updatedTasks);
    let dataObj = {
      id: taskId
    }

    axios.post(serviceHost + '/task/deleteTask', dataObj)
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.msg);
          getAllTasks();
        }

      })
      .catch((err) => {
        console.log("err", err);
      })
  }

  const updateTask = (taskId) => {
    let taskToUpdate = tasks.filter((task) => task._id === taskId);
    let task = taskToUpdate && taskToUpdate.length > 0 ? taskToUpdate[0] : {};

    setTask(task);
    setShowAddTask(true);
  }

  const showTaskForm = () => {
    setShowAddTask(!showAddTask);
  }

  const logout = () => {
    window.localStorage.clear();
    history.push("/")
  }

  return (
    <>
      <span className="float-right" onClick={logout}>Logout</span>

    
      {showAddTask && <TaskForm task={task} setTask={setTask} saveTask={saveTask} />}

      <div className="container">


        {!showAddTask &&
          <>
            <label htmlFor="users">Tasks</label>

            <button type="button" className="btn btn-default" onClick={showTaskForm}>

              <i className="fas fa-plus" ></i>

            </button>
            <table className="table">
              <thead>
                <tr>
                  {
                    header && header.map((h) => {
                      return <th key={h.name}>{h.displayName}</th>
                    })
                  }
                </tr>
              </thead>
              <tbody>

                {
                  tasks && tasks.length > 0 && tasks.map((d) => {
                    return (
                      <tr>
                        {
                          header.map((h) => {
                            return (
                              <>
                                {h.name !== 'action' && <td key={h.name}>{d[[h.name]]}</td>}
                                {
                                  h.name === 'action' &&
                                  <td>
                                    <span onClick={() => updateTask(d._id)} style={{ marginRight: '10px', cursor: 'pointer' }}><i className="fas fa-edit" ></i></span>
                                    <span onClick={() => deleteTask(d._id)} style={{ color: 'red', cursor: 'pointer' }}><i className="fas fa-trash-alt" ></i></span>
                                    {/* <button className="btn btn-danger" onClick={() => updateTask(d.id)}>Update</button> */}
                                    {/* <button className="btn btn-danger" onClick={() => deleteTask(d.id)}>Delete</button> */}
                                  </td>
                                }
                              </>
                            )
                          })
                        }

                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </>
        }

      </div>

    </>
  )
}

export default TaskList;