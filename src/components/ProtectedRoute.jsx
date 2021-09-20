import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, componentProps, ...rest }) => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem("userIsLoggedIn"));
  return (
    <Route
      {...rest}
      render={() => {
        return isLoggedIn ? (
          <Component {...componentProps} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
