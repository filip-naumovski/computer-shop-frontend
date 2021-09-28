import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminProtectedRoute = ({
  component: Component,
  componentProps,
  ...rest
}) => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem("userIsLoggedIn"));
  const roles = JSON.parse(window.localStorage.getItem("userRoles"));
  return (
    <Route
      {...rest}
      render={() => {
        return isLoggedIn && roles.includes("Admin") ? (
          <Component {...componentProps} />
        ) : (
          <Redirect to="/products" />
        );
      }}
    />
  );
};

export default AdminProtectedRoute;
