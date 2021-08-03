import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Switch, AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const Nav = ({ darkMode, classes, setDarkMode, state, logout }) => {
  const location = useLocation();
  const { isLoggedIn } = state.auth;

  const titleString = location.pathname.slice(1);
  let firstLetter = titleString.charAt(0).toUpperCase();
  const newString = `${firstLetter}${titleString.slice(1)}`;

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Switch checked={darkMode} onChange={setDarkMode} />
          <Typography variant="h5" className={classes.title}>
            {newString}
          </Typography>
          {!isLoggedIn ? (
            <div>
              <Link to="/login">
                <Button color="secondary">Login</Button>
              </Link>
              <Link to="/register">
                <Button color="secondary">Register</Button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/products">
                <Button color="secondary">Products</Button>
              </Link>
              <Link to="/login">
                <Button color="secondary" onClick={() => logout()}>
                  Logout
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
