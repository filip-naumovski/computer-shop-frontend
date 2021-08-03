import "./Products.css";
import React, { useState, useEffect } from "react";

import Product from "./Product/Product";
import { useGetProductsQuery } from "../../services/computerShopService";

import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

const Products = ({ handleOpen, handleClose }) => {
  const { data, error, isLoading, refetch } = useGetProductsQuery();
  const theme = useTheme();

  return (
    <div className="container">
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
          data.map((product, key) => (
            <Product
              product={product}
              key={key}
              handleOpen={handleOpen}
              handleClose={handleClose}
              refreshProducts={refetch}
            />
          ))
        )}
      </Box>
    </div>
  );
};

export default Products;
