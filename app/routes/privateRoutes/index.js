import React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router/Redirect';

const PrivateRoute = props =>
  localStorage.getItem('accessToken') ? (
    <Route {...props} />
  ) : (
    <Redirect to="/signin" />
  );

export default PrivateRoute;
