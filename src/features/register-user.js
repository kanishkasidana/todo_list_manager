import React, { useState } from 'react';
import axios from 'axios';
import { serviceHost } from '../config/const';
import { useHistory } from 'react-router-dom';
import regex from '../common/validation-regex';
import cloneDeep from 'lodash/cloneDeep';
import { isEmpty } from '../common/is-empty';

function RegisterUser() {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors(validate(name, value));
    setUser({ ...user, [name]: value });
  }

  const createUser = (e) => {
    e.preventDefault();

    if (user.password === user.confirmPassword) {
      axios.post(serviceHost + '/user/create', user)
        .then((response) => {
          if (response.data.success === true) {
            alert(response.data.msg);
            setUser({});
            history.push('/');
          }

        })
        .catch((err) => {
          console.log("err", err);
        })
    } else {
      alert('Password and Confirm Password do not match.');
    }

  }

  const validate = (name, value) => {
    let errorsObj = cloneDeep(errors);
    if (name === "name") {
      if (!value) {
        errorsObj.name = 'User Name is required';
      } else {
        errorsObj.name = '';
      }
    }
    if (name === "email") {
      if (!value) {
        errorsObj.email = 'Email is required';
      } else if (!regex.emailValid.test(value)) {
        errorsObj.email = "Email is invalid";
      } else {
        errorsObj.email = '';
      }
    }
    if (name === "password") {
      if (!value) {
        errorsObj.password = 'Password is required';
      } else if (!regex.passwordValid.test(value)) {
        errorsObj.password = "Password must contain minimum eight characters, at least one letter and one number";
      } else {
        errorsObj.password = '';
      }
    }
    if (name === "confirmPassword") {
      if (!value) {
        errorsObj.confirmPassword = 'Confirm Password is required';
      } else if (!regex.passwordValid.test(value)) {
        errorsObj.confirmPassword = "Password must contain eight characters, at least one letter and one number";
      } else {
        errorsObj.confirmPassword = '';
      }
    }

    return errorsObj;
  }

  return (
    <>
      <div className="container">
        <div className="well">
          <form>
            <div className="row">
              <div className="col-sm-6 form-group">
                <label htmlFor="name">User Name <span style={{ color: 'red' }}>*</span></label>
                <input type="text" name="name" value={user.name} onChange={handleInputChange} autoComplete="off" />
                {errors.name && (
                  <p className="madate">{errors.name}</p>
                )}
              </div>
              <div class="col-sm-6 form-group">
                <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
                <input type="email" name="email" value={user.email} onChange={handleInputChange} autoComplete="off" />
                {errors.email && (
                  <p className="madate">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="row">
              <div class="col-sm-6 form-group">
                <label htmlFor="password">Password <span style={{ color: 'red' }}>*</span></label>
                <input type="password" name="password" value={user.password} onChange={handleInputChange} autoComplete="off" />
                {errors.password && (
                  <p className="madate">{errors.password}</p>
                )}
              </div>
              <div class="col-sm-6 form-group">
                <label htmlFor="confirmPassword">Confirm Password <span style={{ color: 'red' }}>*</span></label>
                <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleInputChange} autoComplete="off" />
                {errors.confirmPassword && (
                  <p className="madate">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary" onClick={createUser} disabled={(!isEmpty(errors))}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterUser;