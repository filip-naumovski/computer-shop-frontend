import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { styled } from "@material-ui/styles";

import {
  Switch,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  useTheme,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSearch } from "redux/search/searchSlice";
import { useSelector } from "react-redux";

const Nav = ({ darkMode, setDarkMode, logout }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { isLoggedIn } = state.auth;
  const theme = useTheme();

  const SearchField = styled(TextField)({
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: "30vw",
  });

  const StyledToolbar = styled(Toolbar)({
    zIndex: 1,
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100vw",
    marginTop: "-100px",
    boxShadow: "1px 5px 10px 0px rgba(0,0,0,0.56)",
  });

  // const handleSearch = (e) => {
  //   );
  // };

  return (
    <StyledToolbar className="nav">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Switch checked={darkMode} onChange={setDarkMode} />
        <Typography variant="h5" color="secondary">
          Computer Shop
        </Typography>
      </div>
      <div className="middle">
        <SearchField
          autoFocus="autoFocus" // TODO SPAGHETTI
          onChange={(e) => {
            dispatch(setSearch({ input: e.target.value }));
          }}
          value={state.search.input}
          placeholder="Search for products..."
          variant="filled"
          size="small"
          hiddenLabel
          InputProps={{
            style: { color: "#0f0f0f" },
          }}
        />
      </div>
      <div className="left">
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
            <Link to="/cart">
              <Button color="secondary">Cart</Button>
            </Link>
            <Link to="/orders">
              <Button color="secondary">Orders</Button>
            </Link>
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
      </div>
    </StyledToolbar>
  );
};

export default Nav;
