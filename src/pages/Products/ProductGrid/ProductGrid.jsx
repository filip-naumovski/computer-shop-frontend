import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "../Products.css";
import Product from "./Product/Product";

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
          .filter((product) => {
            const input = state.search.input
              .split("")
              .filter((c) => c !== " ")
              .join("")
              .toLowerCase();
            const fullName = `${product.type}${product.brand}${product.name}`
              .split("")
              .filter((c) => c !== " ")
              .join("")
              .toLowerCase();
            return (
              product.name.toLowerCase().includes(input) ||
              product.brand.toLowerCase().includes(input) ||
              product.type.toLowerCase().includes(input) ||
              product.description.toLowerCase().includes(input) ||
              fullName.includes(input)
            );
          })
          .map((product, key) => (
            <Product product={product} key={key} refreshProducts={refetch} />
          ))
      )}
    </Box>
  );
};

export default ProductGrid;
