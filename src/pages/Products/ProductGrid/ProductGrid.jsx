import "../Products.css";
import Product from "./Product/Product";
import { Box } from "@material-ui/core";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProductGrid = ({
  data,
  error,
  isLoading,
  theme,
  refetch,
  selectedCategory,
}) => {
  const state = useSelector((state) => state);
  return (
    <Box
      component="div"
      className="grid"
      bgcolor={theme.palette.secondary.main}
    >
      {error ? (
        <div>Oops! Something went wrong.</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Oops! Something went wrong.</div>
      ) : selectedCategory ? (
        data
          .filter((product) => product.type === selectedCategory)
          .map((product, key) => (
            <Product product={product} key={key} refreshProducts={refetch} />
          ))
      ) : (
        data
          .filter(
            (product) =>
              product.name
                .toLowerCase()
                .includes(state.search.input.toLowerCase()) ||
              product.brand
                .toLowerCase()
                .includes(state.search.input.toLowerCase()) ||
              product.type
                .toLowerCase()
                .includes(state.search.input.toLowerCase())
          )
          .map((product, key) => (
            <Product product={product} key={key} refreshProducts={refetch} />
          ))
      )}
    </Box>
  );
};

export default ProductGrid;
