import "../Products/Products.css";
import "./Orders.css";
import Product from "pages/Products/ProductGrid/Product/Product";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import React, { useState, useEffect } from "react";
import { useGetOrdersQuery } from "services/computerShopService";
import { useTheme } from "@material-ui/styles";
import { useHistory } from "react-router";
import { setNotification } from "redux/notification/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useConfirmOrderMutation } from "services/computerShopService";

const Orders = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [confirmOrder, { confirmLoading, confirmError }] =
    useConfirmOrderMutation();

  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

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
      fontSize: "1.25em",
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
    disabled: {
      backgroundColor: "#6a6a6a",
      "&:hover": {
        transform: "scale(1)",
        backgroundColor: "#6a6a6a",
        cursor: "default",
      },
      "&:active": {
        transform: "scale(1)",
        backgroundColor: "#6a6a6a",
      },
    },
  }));
  const classes = useStyles();

  const handleConfirm = async (id) => {
    try {
      const confirmResponse = await confirmOrder(id).unwrap();
      dispatch(
        setNotification({
          alertMessage: "Successfully confirmed order!",
          alertType: "success",
          open: true,
        })
      );
      refetch();
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        dispatch(
          setNotification({
            alertMessage: "Order not found.",
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
    <div className="orders-container">
      {error ? (
        <div>Oops! Something went wrong.</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        orders.map((order, key) => (
          <div key={key} className="order-container">
            <span className="ordered-by">
              Ordered by: {order.applicationUser.email}
            </span>
            <Box
              component="div"
              className="grid"
              bgcolor={theme.palette.secondary.main}
            >
              {order.products.map((product, key) => (
                <Product
                  product={product}
                  key={key}
                  refreshProducts={refetch}
                />
              ))}
            </Box>
            <div className={classes.submit}>
              <div>
                Total price:{" $"}
                {error ? (
                  <div>Oops! Something went wrong.</div>
                ) : isLoading ? (
                  <div>Loading...</div>
                ) : (
                  order.products.reduce((prev, curr) => {
                    return prev + curr.price;
                  }, 0)
                )}
                <br />
                Status: {order.accepted ? "Accepted" : "Not accepted"}
              </div>
              {state.auth.roles.includes("Admin") && (
                <Button
                  className={`${classes.button} ${
                    (order.accepted || confirmLoading) && classes.disabled
                  }`}
                  disabled={confirmLoading || order.accepted}
                  onClick={() => handleConfirm(order.id)}
                >
                  Confirm
                </Button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
