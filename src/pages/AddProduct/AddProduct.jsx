import "./AddProduct.css";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { setNotification } from "../../redux/notification/notificationSlice";
import { useAddProductMutation } from "../../services/computerShopService";

import { Button, CssBaseline, TextField, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";

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

const AddProduct = () => {
  const dispatch = useDispatch();

  const [addProduct, { isLoading: addIsLoading, error: addError }] =
    useAddProductMutation();

  const [input, setInput] = useState({
    id: 0,
    name: "",
    brand: "",
    type: "",
    description: "",
    price: 0,
    photoUrl: "",
  });

  const history = useHistory();

  const classes = useStyles();

  const theme = useTheme();

  const handleChange = (e) => {
    setInput((prevState) => {
      const newState = { ...prevState };
      newState[e.target.name] = e.target.value;
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(input);
      const addResponse = await addProduct(input).unwrap();
      dispatch(
        setNotification({
          alertMessage: "Successfully added product!",
          alertType: "success",
          open: true,
        })
      );
      history.push("/products");
    } catch (error) {
      console.log(error);
      error.data
        ? dispatch(
            setNotification({
              alertMessage:
                "There was an error adding the product. Please try again.",
              alertType: "error",
              open: true,
            })
          )
        : dispatch(
            setNotification({
              alertMessage:
                "There was an issue contacting the server. Please try again later.",
              alertType: "error",
              open: true,
            })
          );
    }
  };

  return (
    <div className="container">
      <Box
        component="div"
        className="formContainer"
        bgcolor={theme.palette.secondary.main}
      >
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            label="Name"
            autoFocus
            value={input?.name}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="brand"
            name="brand"
            label="Brand"
            value={input?.brand}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="type"
            name="type"
            label="Type"
            value={input?.type}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={input?.description}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            name="price"
            label="Price"
            value={input?.price}
            onChange={(e) => handleChange(e)}
            type="number"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={addIsLoading}
          >
            Add product
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddProduct;
