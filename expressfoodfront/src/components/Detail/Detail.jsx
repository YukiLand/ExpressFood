import { Box, Button, Grid, TextField } from "@mui/material";

import './Detail.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {

    const id = useParams();

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    

    useEffect (() => {
        const getMeal = async () => {
            const response = await fetch(`http://localhost:8000/meal/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            });
            const data = await response.json();
            const meal = await data[0];
            setImage(meal.image);
            setName(meal.name);
            setPrice(meal.price);
            setDescription(meal.description);
        }
        getMeal();
        
    }, [id])

    return (
        <div className="detail">
            <Box>
                <Grid container columns={{ xs: 1, sm: 8, md: 12 }}>
                    <Grid xs={1} sm={4} md={6} >
                        <img className="detail-img" src={image} alt="" />
                    </Grid>
                    <Grid xs={1} sm={4} md={6}>
                        <Grid xs={12}>
                            <h1> {name} </h1>
                            <h2>{price}</h2>
                            <p>{description}</p>
                            <Grid alignItems='center' columns={{ xs: 3, sm: 4, md: 8 }} spacing={2} container>
                                <Grid item>
                                    <Button variant="outlined">Ajouter au panier</Button>
                                </Grid>
                                <Grid item xs={1} sm={2} md={2}>
                                    <TextField  className="detail-quantite" size="small" InputProps={{ inputProps: { min: 1, max: 9 } }} label="Quantité" type="number" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Detail;