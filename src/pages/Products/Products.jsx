import "./Products.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProductGrid from "./ProductGrid/ProductGrid";
import ProductCategories from "./ProductCategories/ProductCategories";
import { useGetProductsQuery } from "../../services/computerShopService";

import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useHistory } from "react-router";

const Products = () => {
  const state = useSelector((state) => state);
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const history = useHistory();

  const { data, error, isLoading, refetch } = useGetProductsQuery();

  const theme = useTheme();

  useEffect(() => {
    refetch();
  }, [history, refetch]);

  const setCategory = (category) => {
    setSelectedCategory((prevState) => {
      return prevState === category ? "" : category;
    });
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "5px",
      transition: "all 0.1s ease-in",
      color: theme.palette.primary.text,
      height: "100%",
      width: "100%",
      fontSize: "1.5em",
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

  return (
    <div className="container">
      <div className="left-container">
        {state.auth.roles.includes("Admin") && (
          <Box className="add-container" component="div">
            <Link to={`${location.pathname}/add`}>
              <Button color="primary" className={classes.button}>
                Add new product
              </Button>
            </Link>
          </Box>
        )}
        <ProductCategories
          theme={theme}
          isLoading={isLoading}
          data={data}
          error={error}
          category={{ selectedCategory, setCategory }}
        />
      </div>
      <ProductGrid
        data={data}
        theme={theme}
        error={error}
        isLoading={isLoading}
        refetch={refetch}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Products;
