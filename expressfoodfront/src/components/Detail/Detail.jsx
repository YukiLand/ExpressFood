import { Box, Button, Grid, TextField } from "@mui/material";

import './Detail.css'

function Detail() {
    return (
        <div className="detail">
            <Box>
                <Grid container columns={{ xs: 1, sm: 8, md: 12 }}>
                    <Grid xs={1} sm={4} md={6} >
                        <img className="detail-img" src="/src/assets/desc2.jpg" alt="" />
                    </Grid>
                    <Grid xs={1} sm={4} md={6}>
                        <Grid xs={12}>
                            <h1>Boeuf Loc Lac</h1>
                            <h2>12€</h2>
                            <p>Boeuf sauté au poivre noir et sauce soja, servi avec du riz blanc et une salade de tomates</p>
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