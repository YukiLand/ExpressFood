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

function Product() {

    return (
        <div className="product">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container columns={{ xs: 1, sm: 8, md: 12 }}>
                    {Array.from(Array(4)).map((_, index) => (
                        <Grid spacing={2} className='grid-card' xs={1} sm={4} md={6} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia component="img" sx={{ maxHeight: 200 }} image="/src/assets/desc1.jpg" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        9.99€
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to="/detail"><Button  size="small">Commander</Button></Link>
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