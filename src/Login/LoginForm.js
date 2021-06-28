import { Button, CssBaseline, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setCredentials } from "../redux/auth/authSlice";
import { useLoginMutation } from "../services/computerShopService";
import history from "../utils/history";
import "./Login.css";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginForm = ({ handleOpen, handleClose }) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [input, setInput] = useState({ username: "", password: "" });

    const classes = useStyles();
    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userResponse = await login(input).unwrap();
            window.localStorage.setItem("userToken", userResponse.token);
            window.localStorage.setItem(
                "userExpiration",
                userResponse.expiration
            );
            window.localStorage.setItem(
                "userRoles",
                JSON.stringify(userResponse.roles)
            );
            window.localStorage.setItem("userIsLoggedIn", JSON.stringify(true));
            dispatch(
                setCredentials({
                    token: userResponse.token,
                    expiration: userResponse.expiration,
                    roles: userResponse.roles,
                    isLoggedIn: true,
                })
            );
            handleOpen("Successfully logged in!", "success");
            history.push("/products");
        } catch (err) {
            console.error(err);
            handleOpen("Error while attempting to log in!", "error");
        }
    };

    const handleChange = (e) => {
        setInput((prevState) => {
            const newState = { ...prevState };
            newState[e.target.name] = e.target.value;
            return newState;
        });
    };

    return (
        <div className={classes.paper}>
            <CssBaseline />
            {state.auth.isLoggedIn ? (
                <Typography component="h1" variant="h1">
                    {" "}
                    Welcome!{" "}
                </Typography>
            ) : (
                <div>
                    <Typography component="h1" variant="h4" color="textPrimary">
                        Sign in to continue
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={input.username}
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={input.password}
                            onChange={(e) => handleChange(e)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default withRouter(LoginForm);
