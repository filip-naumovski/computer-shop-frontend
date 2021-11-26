import {
  Button,
  Switch,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import SearchField from "components/SearchField";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = ({ darkMode, setDarkMode, logout }) => {
  const authState = useSelector((state) => state.auth);

  const { isLoggedIn } = authState;
  const theme = useTheme();

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

  return (
    <StyledToolbar className="nav">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Switch checked={darkMode} onChange={setDarkMode} />
        <Typography variant="h5" color="secondary">
          Computer Shop
        </Typography>
      </div>
      <div className="middle">
        <SearchField />
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
