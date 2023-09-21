import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

import "./Product.css";
import { useEffect, useState } from 'react';

function Product() {

    const [products, setProducts] = useState([]);

    useEffect (() => {
        async function getProducts() {
            const response = await fetch('http://localhost:8000/meal/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setProducts(data);
        }
        getProducts();
    }, [])

    console.log(products);

    return (
        <div className="product">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container columns={{ xs: 1, sm: 8, md: 12 }}>
                    {products.map((meal, index) => (
                        <Grid spacing={2} className='grid-card' xs={1} sm={4} md={6} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia component="img" sx={{ maxHeight: 200, width:345 }} image={ meal.image } />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {meal.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {meal.price} €
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {meal.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/detail/${meal.uuid}`}><Button  size="small">Commander</Button></Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Product;