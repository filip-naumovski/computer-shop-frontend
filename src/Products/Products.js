import "./Products.css";
import React, { useState, useEffect } from "react";

import Product from "./Product/Product";

import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

const Products = () => {
    const [products, setProducts] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetch("http://localhost:5000/api/products", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);
    return (
        <div className="container">
            <Box
                component="div"
                className="grid"
                bgcolor={theme.palette.secondary.main}
            >
                {products.map((product, key) => (
                    <Product {...product} key={key} />
                ))}
            </Box>
        </div>
    );
};

export default Products;
