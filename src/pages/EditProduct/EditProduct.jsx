import "./EditProduct.css";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { setNotification } from "../../redux/notification/notificationSlice";
import { useGetProductQuery } from "../../services/computerShopService";
import { useUpdateProductMutation } from "../../services/computerShopService";

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

const EditProduct = ({ handleOpen, handleClose }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const {
    data: product,
    isLoading: productIsLoading,
    isError: productError,
  } = useGetProductQuery(id);
  const [updateProduct, { isLoading: updateIsLoading, error: updateError }] =
    useUpdateProductMutation();

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

  useEffect(() => {
    if (product) {
      setInput((prevState) => {
        let newState = {
          ...prevState,
        };
        Object.keys(newState).forEach((key) => {
          newState[key] = product[key];
        });
        return newState;
      });
    }
  }, [product]);

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
      console.log(`id: ${id}`);
      console.log(input);
      const updateResponse = await updateProduct({
        id: id,
        product: input,
      }).unwrap();
      dispatch(
        setNotification({
          alertMessage: "Successfully updated product!",
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
                "There was an error updating the product. Please try again.",
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
        {productError ? (
          <div>Oops! Something went wrong.</div>
        ) : productIsLoading ? (
          <div>Loading...</div>
        ) : (
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Product name"
              name="name"
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
              label="Product brand"
              value={input?.brand}
              onChange={(e) => handleChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={updateIsLoading}
            >
              Update
            </Button>
          </form>
        )}
      </Box>
    </div>
  );
};

export default EditProduct;
