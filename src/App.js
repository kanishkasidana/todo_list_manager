import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Login from './features/login';
import Logout from './features/logout';
import Dashboard from './features/dashboard';
import PrivateRoute from './features/private-route';
import RegisterUser from './features/register-user';
import TaskForm from './features/task-form';
import TaskList from './features/task-list';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <RegisterUser />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          {/* <Route exact path="/all-tasks" ><TaskList /></Route> */}
          <PrivateRoute path="/" render={(props) => (
            <>
              <Route exact path="/all-tasks" ><Dashboard {...props} /></Route>
              <Route exact path="/task/add" ><TaskForm {...props} /></Route>
              <Route exact path="/task/edit/:id" render={(props) => (<TaskForm {...props} taskId={props.match.params.id} />)}></Route>
              <Route exact path="/archived-tasks"><TaskList {...props} type="archive" /></Route>

            </>
          )}>

          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
