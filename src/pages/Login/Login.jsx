import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm";

const Login = () => {
  const theme = useTheme();
  return (
    <Box className="container">
      <Box className="user-form" bgcolor={theme.palette.secondary.main}>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
