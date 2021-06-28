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
import Login from "./Login/Login";
import Nav from "./Nav";
import Products from "./Products/Products";
import { setCredentials } from "./redux/auth/authSlice";
import Register from "./Register/Register";
import history from "./utils/history";

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

    const [darkMode, setDarkMode] = useState(false);
    const darkModeHandler = () => {
        setDarkMode(!darkMode);
    };

    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("Successfully logged in!");

    const handleOpen = (msg, type) => {
        setAlertMessage(msg);
        setAlertType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        let storedDarkMode = JSON.parse(
            window.localStorage.getItem("darkMode")
        );
        setDarkMode(storedDarkMode);
        let token = window.localStorage.getItem("userToken");
        let expiration = window.localStorage.getItem("userExpiration");
        let roles = JSON.parse(window.localStorage.getItem("userRoles"));
        let isLoggedIn = JSON.parse(
            window.localStorage.getItem("userIsLoggedIn")
        );
        let currentDate = new Date();
        let expirationDate = new Date(expiration);
        token != null && expirationDate > currentDate
            ? dispatch(setCredentials({ token, expiration, roles, isLoggedIn }))
            : dispatch(
                setCredentials({
                    token: "",
                    expiration: "",
                    roles: [],
                    isLoggedIn: false,
                })
            );
    }, []);

    const logoutHandler = () => {
        dispatch(
            setCredentials({
                token: "",
                expiration: "",
                roles: [],
                isLoggedIn: false,
            })
        );
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
                        <Route path="/products">
                            <Products />
                        </Route>
                        <Route path="/login">
                            <Login
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                            />
                        </Route>
                        <Route path="/register">
                            <Register
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                            />
                        </Route>
                    </RouterSwitch>
                </div>
            </Router>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => handleClose()}
            >
                <Alert
                    severity={alertType}
                    variant="filled"
                    onClose={() => handleClose()}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default App;
