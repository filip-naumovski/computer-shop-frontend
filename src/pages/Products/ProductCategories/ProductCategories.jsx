import "../Products.css";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React, { useState, useEffect } from "react";

const ProductCategories = ({ theme, data, isLoading, error, category }) => {
  const useStyles = makeStyles((theme) => ({
    category: {
      padding: "5px",
      marginBottom: "10px",
      width: "100%",
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
    selected: {
      backgroundColor: theme.palette.primary.hover,
      fontWeight: "bold",
    },
  }));
  const classes = useStyles();
  return (
    <Box
      component="div"
      className="categories-container"
      bgcolor={theme.palette.secondary.main}
    >
      <h1>Product Categories</h1>
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        <div>Oops! Something went wrong.</div>
      ) : (
        [...new Set(data.map((product) => product.type))].map((productType) => (
          <div
            onClick={() => category.setCategory(productType)}
            className={`${classes.category} ${
              category.selectedCategory === productType && classes.selected
            }`}
          >
            {productType}
          </div>
        ))
      )}
    </Box>
  );
};

export default ProductCategories;
