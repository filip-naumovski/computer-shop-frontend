import { Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import Product from "pages/Products/ProductGrid/Product/Product";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setNotification } from "redux/notification/notificationSlice";
import {
  useGetUserCartQuery,
  useSubmitOrderMutation,
} from "services/computerShopService";
import "../Products/Products.css";
import "./Cart.css";

const Cart = () => {
  const { data: cart, isLoading, error, refetch } = useGetUserCartQuery();

  const [submitProducts, { submitIsLoading, submitError }] =
    useSubmitOrderMutation();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [history]);

  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    submit: {
      fontSize: "1.8em",
      backgroundColor: theme.palette.secondary.main,
      padding: "25px",
      borderRadius: "10px",
      width: "70vw",
      height: "10vh",
      marginTop: "10px",
      boxShadow: "10px 10px 18px -9px rgba(0,0,0,0.75)",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    button: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "5px",
      marginBottom: "10px",
      height: "70%",
      width: "30%",
      textAlign: "center",
      backgroundColor: theme.palette.primary.main,
      borderRadius: "5px",
      transition: "all 0.1s ease-in",
      color: theme.palette.primary.text,
      "&:hover": {
        backgroundColor: theme.palette.primary.hover,
        transform: "scale(1.01)",
        cursor: "pointer",
      },
      "&:active": {
        backgroundColor: theme.palette.primary.active,
        transform: "scale(0.99)",
      },
    },
  }));
  const classes = useStyles();

  const handleSubmit = async () => {
    try {
      const submitResponse = await submitProducts().unwrap();
      dispatch(
        setNotification({
          alertMessage: "Successfully ordered products!",
          alertType: "success",
          open: true,
        })
      );
      history.push("/products");
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        dispatch(
          setNotification({
            alertMessage: "Product not found.",
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
              alertMessage:
                "There was an issue contacting the server. Please try again later.",
              alertType: "error",
              open: true,
            })
          );
    }
  };

  return (
    <div className="cart-container">
      <Box
        component="div"
        className="grid"
        bgcolor={theme.palette.secondary.main}
      >
        {error ? (
          <div>Oops! Something went wrong.</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          cart.products.map((product, key) => (
            <Product product={product} key={key} refreshProducts={refetch} />
          ))
        )}
      </Box>
      <div className={classes.submit}>
        <div>
          Total price:{" $"}
          {error ? (
            <div>Oops! Something went wrong.</div>
          ) : isLoading ? (
            <div>Loading...</div>
          ) : (
            cart.products.reduce((prev, curr) => {
              return prev + curr.price;
            }, 0)
          )}
        </div>
        <div className={classes.button} onClick={handleSubmit}>
          Proceed to checkout
        </div>
      </div>
    </div>
  );
};

export default Cart;
