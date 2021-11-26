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
import AddProduct from "./pages/AddProduct/AddProduct";
import history from "./utils/history";
import EditProduct from "pages/EditProduct/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Cart from "pages/Cart/Cart";
import Orders from "pages/Orders/Orders";

const App = () => {
  const notificationState = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  console.log("app rerender");

  const [darkMode, setDarkMode] = useState(true);
  const darkModeHandler = () => {
    setDarkMode(!darkMode);
  };

  const handleClose = () => {
    dispatch(
      setNotification({
        alertMessage: notificationState.alertType,
        alertType: notificationState.alertType,
        open: false,
      })
    );
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

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#4eafc0" : "#110a9c",
        hover: darkMode ? "#4eafff" : "#110afc",
        active: darkMode ? "#12345f" : "#11a6fa",
        text: darkMode ? "#000000" : "#ffffff",
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
          setDarkMode={() => darkModeHandler()}
          logout={() => logoutHandler()}
        />
        <div style={{ marginTop: "100px" }}>
          <RouterSwitch>
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/orders" component={Orders} />
            <AdminProtectedRoute
              exact
              path="/products/edit/:id"
              component={EditProduct}
            />
            <AdminProtectedRoute
              exact
              path="/products/add"
              component={AddProduct}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </RouterSwitch>
        </div>
      </Router>
      <Snackbar
        open={notificationState.open}
        autoHideDuration={6000}
        onClose={() => handleClose()}
      >
        <Alert
          severity={notificationState.alertType}
          variant="filled"
          onClose={() => handleClose()}
        >
          {notificationState.alertMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
