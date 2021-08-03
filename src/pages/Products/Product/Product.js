import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useDeleteProductMutation } from "services/computerShopService";

const useStyles = makeStyles({
  root: {
    width: "20vw",
    height: "430px",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 140,
  },
  actions: {
    marginBottom: 0,
    marginTop: "auto",
  },
});

const Product = ({ product, handleOpen, handleClose, refreshProducts }) => {
  const [deleteButtonsShown, setDeleteButtonsShown] = useState(false);

  const state = useSelector((state) => state);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const classes = useStyles();
  const handleDelete = async () => {
    try {
      const deleteResponse = await deleteProduct(product.id).unwrap();
      handleOpen(
        `Successfully deleted product with id ${deleteResponse.id}`,
        "success"
      );
      setDeleteButtonsShown(false);
      refreshProducts();
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        handleOpen("Product not found.", "error");
        return;
      }
      error.data
        ? handleOpen(error.data.message, "error")
        : handleOpen(
            "There was an issue contacting the server. Please try again later.",
            "error"
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
          height="140"
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
            <a href={`/products/${product.id}`}>
              <Button size="small" color="primary">
                Edit
              </Button>
            </a>
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
      </CardActions>
    </Card>
  );
};

export default Product;
