import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React from "react";
import "./Register.css";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const theme = useTheme();
  return (
    <Box className="container">
      <Box className="user-form" bgcolor={theme.palette.secondary.main}>
        <RegisterForm />
      </Box>
    </Box>
  );
};

export default Register;
