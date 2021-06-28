import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        width: "20vw",
        height: "430px",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.1s ease-in-out",
        "&:hover, &:focus": {
            transform: "scale(1.02)",
        },
    },
    media: {
        height: 140,
    },
    actions: {
        marginBottom: 0,
        marginTop: "auto",
    },
});

const Product = (product) => {
    const classes = useStyles();
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
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        component="span"
                    >
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
                <Button size="small" color="primary">
                    Edit
                </Button>
                <Button size="small" color="primary">
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Product;
