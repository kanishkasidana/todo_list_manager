import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { serviceHost } from '../config/const';

function Login() {
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues({ ...inputValues, [name]: value });
  }

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("inputValues", inputValues);

    axios.post(serviceHost + '/login', inputValues)
      .then((response) => {
        if (response.data.success === true) {
          
          console.log("response.data.token", response.data.token);
          window.localStorage.setItem("access_token", response.data.token);
          history.push('/all-tasks');
        }

      })
      .catch((err) => {
        console.log("err", err);
      })


  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6" style={{ border: '1px solid block' }}>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" type="text" placeholder="Email" name="username" value={inputValues.username || ''} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" type="password" placeholder="Password" name="password" value={inputValues.password || ''} onChange={handleInputChange} />
              </div>

              <button type="submit" onClick={loginUser} className="btn btn-primary" disabled={!(inputValues.username && inputValues.password)}>
                Login
              </button>
              <span>Don't have an account, register <Link to="/register">here</Link></span>
            </form>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </>
  )
}

export default Login;