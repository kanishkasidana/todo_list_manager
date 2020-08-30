import React from 'react';
import TaskList from './task-list';
import { useHistory } from 'react-router-dom';

function Dashboard() {
  const history = useHistory();

  const showTaskForm = () => {
    history.push("/task/add");
  }

  const logout = () => {
    window.localStorage.clear();
    history.push("/")
  }

  return (
    <>
      <span className="float-right" onClick={logout} style={{ cursor: 'pointer', marginRight: '50px', color: 'blue' }}>Logout</span>

      <div className="container">

        <label htmlFor="tasks" style={{ fontSize: '20px', fontWeight: '500' }}>Tasks</label>
        <button type="button" className="btn btn-default" onClick={showTaskForm}>
          <i className="fas fa-plus" title="add" style={{ color: '#36c724', cursor: 'pointer' }}></i>
        </button>

        <TaskList type="all" />
      </div>

    </>
  )
}

export default Dashboard;