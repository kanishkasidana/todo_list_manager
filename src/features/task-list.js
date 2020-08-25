import React, { useState, useEffect } from 'react';
// import TaskForm from './task-form';
import axios from 'axios';
import { serviceHost } from '../config/const';
import { useHistory, Link } from 'react-router-dom';

function TaskList(props) {
  const [header] = useState([
    { name: 'title', displayName: 'Task Title' },
    { name: 'description', displayName: 'Task Description' },
    { name: 'priority', displayName: 'Priority' },
    { name: 'status', displayName: 'Status' },
    { name: 'action', displayName: 'Action' },
  ])
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { type } = props;

  useEffect(() => {
    if (props.type) {
      getAllTasks();
    }
  }, [props]);

  const getAllTasks = () => {
    setLoading(true);

    axios.get(serviceHost + '/task/getAllTasks/' + type)
      .then((response) => {
        if (response.data.success === true) {
          setLoading(false);
          setTasks(response.data.data);
        }

      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      })
  }

  const deleteTask = (taskId) => {
    setLoading(true);

    let dataObj = {
      id: taskId
    }

    axios.post(serviceHost + '/task/deleteTask', dataObj)
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.msg);
          setLoading(false);
          getAllTasks();
        }

      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      })
  }

  const updateTask = (taskId) => {
    history.push("/task/edit/" + taskId);
  }


  const requestArchiveTask = (dataObj) => {
    setLoading(true);

    axios.post(serviceHost + '/task/archiveTask', dataObj)
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.msg);
          setLoading(false);
          getAllTasks();
        }

      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      })
  }

  const archiveTask = (taskId) => {

    let dataObj = {
      id: taskId,
      type: 'archive'
    }

    requestArchiveTask(dataObj);
  }

  const unArchiveTask = (taskId) => {
    let dataObj = {
      id: taskId,
      type: 'un-archive'
    }

    requestArchiveTask(dataObj);
  }

  return (
    <>
      {loading && <div className="loader" >
        <img src="/img/loader.gif" alt=""></img>
      </div>}
      {type && type === 'archive' ? <h5>Archived Tasks</h5> : ''}

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
                          {h.name !== 'action' && <td key={h.name} style={{ textTransform: 'capitalize', color: d['color'] }}>{d[h.name]}</td>}
                          {
                            h.name === 'action' &&
                            <td>
                              <span title="edit" onClick={() => updateTask(d._id)} style={{ marginRight: '10px', cursor: 'pointer' }}><i className="fas fa-edit" ></i></span>
                              <span title="delete" onClick={() => deleteTask(d._id)} style={{ marginRight: '10px', color: 'red', cursor: 'pointer' }}><i className="fas fa-trash-alt" ></i></span>
                              {d['isArchived'] ? <span title="un-archive" onClick={() => unArchiveTask(d._id)} style={{ cursor: 'pointer' }}><i className="fas fa-archive"></i></span> : <span title="archive" onClick={() => archiveTask(d._id)} style={{ cursor: 'pointer', color: 'blue' }}><i className="fas fa-archive"></i></span>}
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

      {type && type === 'archive' ? <Link to="/all-tasks">Show All Tasks</Link> : <Link to="/archived-tasks">Show Archived Tasks</Link>}
    </>
  )
}

export default TaskList;