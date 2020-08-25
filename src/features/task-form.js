import React, { useState } from 'react';

function TaskForm(props) {
  const { task, setTask, saveTask } = props;
  const [statusArr, setStatusArr] = useState([
    { name: 'todo', displayName: 'ToDo' },
    { name: 'in-progress', displayName: 'In Progress' },
    { name: 'completed', displayName: 'completed' },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTask({ ...task, [name]: value })
  }

  const submitTask = (e) => {
    e.preventDefault();

    saveTask(task);

  }

  return (
    <>
      <div className="container">
        <div className="well">
          <form>
            <div className="row">
              <div className="col-sm-6 form-group">
                <label for="title">Task Title</label>
                <input type="text" name="title" value={task.title} onChange={handleInputChange} className="form-control" />
              </div>
              <div class="col-sm-6 form-group">
                <label for="desc">Task Description</label>
                <input type="text" name="description" value={task.description} onChange={handleInputChange} className="form-control" />
              </div>
            </div>
            <div className="row">
              <div class="col-sm-6 form-group">
                <label for="status">Status</label>
                <select name="status" value={task.status} onChange={handleInputChange} className="form-control">
                  <option value="">Select Status</option>
                  {
                    statusArr.map((status) => {
                      return <option key={status.name} value={status.name}>{status.displayName}</option>
                    })
                  }
                </select>

              </div>
              <div class="col-sm-6 form-group">
                <label for="priority">Priority</label>
                <input type="number" name="priority" value={task.priority} onChange={handleInputChange} className="form-control" />
              </div>
            </div>

            <button type="submit" onClick={submitTask}>{task.id ? 'Update' : 'Add'}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default TaskForm;