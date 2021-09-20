import {
  CssBaseline,
  Snackbar,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Router, Switch as RouterSwitch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Nav from "./Nav";
import Products from "./pages/Products/Products";
import { setCredentials } from "./redux/auth/authSlice";
import { setNotification } from "./redux/notification/notificationSlice";
import Register from "./pages/Register/Register";
import history from "./utils/history";
import EditProduct from "pages/EditProduct/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(true);
  const darkModeHandler = () => {
    setDarkMode(!darkMode);
  };

  const handleClose = () => {
    dispatch(setNotification({ open: false }));
  };

  useEffect(() => {
    let storedDarkMode = JSON.parse(window.localStorage.getItem("darkMode"));
    setDarkMode(storedDarkMode);

    let token = window.localStorage.getItem("userToken");
    let expiration = window.localStorage.getItem("userExpiration");
    let roles = JSON.parse(window.localStorage.getItem("userRoles"));
    let isLoggedIn = JSON.parse(window.localStorage.getItem("userIsLoggedIn"));
    let currentDate = new Date();
    let expirationDate = new Date(expiration);
    token != null && expirationDate > currentDate
      ? dispatch(setCredentials({ token, expiration, roles, isLoggedIn }))
      : dispatch(
          setCredentials({
            token: null,
            expiration: null,
            roles: [],
            isLoggedIn: false,
          })
        );
  }, [dispatch]);

  const logoutHandler = () => {
    console.log("logged out");
    dispatch(
      setCredentials({
        token: null,
        expiration: null,
        roles: [],
        isLoggedIn: false,
      })
    );
    localStorage.setItem("userToken", JSON.stringify(null));
    localStorage.setItem("userExpiration", JSON.stringify(null));
    localStorage.setItem("userRoles", JSON.stringify([]));
    localStorage.setItem("userIsLoggedIn", JSON.stringify(false));
  };

  useEffect(() => {
    window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#4eafc0" : "#110a9c",
      },
      secondary: {
        main: darkMode ? "#1f1f1f" : "#c4c4c4",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Nav
          darkMode={darkMode}
          classes={classes}
          setDarkMode={() => darkModeHandler()}
          state={state}
          logout={() => logoutHandler()}
        />
        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <RouterSwitch>
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={EditProduct}
            />
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
          </RouterSwitch>
        </div>
      </Router>
      <Snackbar
        open={state.notification.open}
        autoHideDuration={6000}
        onClose={() => handleClose()}
      >
        <Alert
          severity={state.notification.alertType}
          variant="filled"
          onClose={() => handleClose()}
        >
          {state.notification.alertMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
