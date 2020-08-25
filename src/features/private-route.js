import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let isLogin = window.localStorage.getItem('access_token') !== null ? true : false;
  //console.log("PrivateRoute isLogin=",isLogin);
  let route = (rest.render && isLogin) ? (<Route {...rest} />)
    : (isLogin ? (
      <Component {...rest} />
    ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: rest.location.pathname },
          }}
        />
      )
    )
  return route;
}

export default PrivateRoute;







