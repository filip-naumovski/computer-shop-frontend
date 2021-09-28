import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useDispatch } from "react-redux";
import { setNotification } from "redux/notification/notificationSlice";
import {
  useAddProductToCartMutation,
  useDeleteProductMutation,
} from "services/computerShopService";

const useStyles = makeStyles({
  root: {
    width: "20vw",
    height: "40vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "10px 10px 18px -9px rgba(0,0,0,0.75)",
  },
  media: {
    height: 140,
  },
  actions: {
    marginBottom: 0,
    marginTop: "auto",
  },
});

const Product = ({ product, refreshProducts }) => {
  const [deleteButtonsShown, setDeleteButtonsShown] = useState(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const [addProduct, { AddIsLoading }] = useAddProductToCartMutation();

  const location = useLocation();

  const classes = useStyles();
  const handleDelete = async () => {
    try {
      const deleteResponse = await deleteProduct(product.id).unwrap();
      dispatch(
        setNotification({
          alertMessage: `Successfully deleted product with id ${deleteResponse.id}!`,
          alertType: "success",
          open: true,
        })
      );
      setDeleteButtonsShown(false);
      refreshProducts();
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
  const handleAdd = async () => {
    try {
      const addResponse = await addProduct(product).unwrap();
      dispatch(
        setNotification({
          alertMessage: `Successfully added product with id ${product.id} to cart!`,
          alertType: "success",
          open: true,
        })
      );
      refreshProducts();
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

  const description = product.description.split(";");
  return (
    <Card
      className={classes.root}
      style={{
        alignSelf: "center",
        justifySelf: "center",
        margin: "10px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name}
          height="230"
          image={product.photoUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.type} {product.brand} {product.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="span">
            <ul>
              {description.map((descriptionItem, key) => (
                <li key={key}>{descriptionItem}</li>
              ))}
            </ul>
          </Typography>
          <Typography variant="subtitle1">
            Price: ${product.price}
            .00
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        {state.auth.roles.includes("Admin") && !deleteButtonsShown && (
          <>
            <Link to={`${location.pathname}/edit/${product.id}`}>
              <Button size="small" color="primary">
                Edit
              </Button>
            </Link>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteButtonsShown(true);
              }}
              size="small"
              color="primary"
            >
              Delete
            </Button>
          </>
        )}
        {state.auth.roles.includes("Admin") && deleteButtonsShown && (
          <>
            <Button
              onClick={() => handleDelete()}
              size="small"
              color="primary"
              disabled={isLoading}
            >
              Yes
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteButtonsShown(false);
              }}
              size="small"
              color="primary"
              disabled={isLoading}
            >
              No
            </Button>
            <Typography variant="caption" color="textSecondary">
              Are you sure?
            </Typography>
          </>
        )}
        {state.auth.roles.includes("User") && !product.cartId && (
          <>
            <Button
              onClick={() => handleAdd()}
              size="small"
              color="primary"
              disabled={isLoading}
            >
              Add to cart
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Product;
