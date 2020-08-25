import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Login from './features/login';
import Logout from './features/logout';
import TaskList from './features/task-list';
import PrivateRoute from './features/private-route';
import RegisterUser from './features/register-user';

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
              <Route exact path="/all-tasks" ><TaskList {...props} /></Route>
            </>
          )}>

          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
