import { Button, CssBaseline, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { setNotification } from "../../redux/notification/notificationSlice";
import { useRegisterMutation } from "../../services/computerShopService";
import history from "../../utils/history";
import "./Register.css";

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

const RegisterForm = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const classes = useStyles();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await register(input).unwrap();
      dispatch(
        setNotification({
          alertMessage: userResponse.message,
          alertType: "success",
          open: true,
        })
      );
      history.push("/login");
    } catch (error) {
      if (error.status === 400) {
        dispatch(
          setNotification({
            alertMessage: "Please fill out all the forms properly.",
            alertType: "error",
            open: true,
          })
        );
        return;
      }
      error.data
        ? dispatch(
            setNotification({
              alertMessage: error.data.message,
              alertType: "error",
              open: true,
            })
          )
        : dispatch(
            setNotification({
              alertMessage: error.message,
              alertType: "error",
              open: true,
            })
          );
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
            Register
          </Typography>
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={input.email}
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
              disabled={isLoading}
            >
              Register
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default withRouter(RegisterForm);
