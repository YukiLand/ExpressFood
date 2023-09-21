import { Box, Button, Grid, TextField } from "@mui/material";

import './Detail.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {

    const { id } = useParams();

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [orderInProgress, setOrderInProgress] = useState(false);

    useEffect(() => {
        const orderInProgress = true;
        if (orderInProgress) {
            setOrderInProgress(true);
        }
    }, [])

    useEffect(() => {
        const getMeal = async () => {
            const response = await fetch(`http://localhost:8000/meal/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uuid: id })
            });
            const data = await response.json();
            setImage(data.image);
            setName(data.name);
            setPrice(data.price);
            setDescription(data.description);
            setCategory(data.category);
        }
        getMeal();

    }, [id])

    function updateQuantity(e) {
        setQuantity(e.target.value);
    }

    const addToCart = async () => {
        if (!orderInProgress) {
            const newOrder = {
                customerUUID: '6fc46277-49f7-448b-af40-960ff1258d46',
                meal: {
                    name: name,
                    uuid: id,
                    description: description,
                    image: image,
                    category: category,
                    quantity: quantity,
                    price: price,
                }
            }
            const response = await fetch(`http://localhost:8000/order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
            });
        } else {

            const oldOrder = await fetch(`http://localhost:8000/order/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uuid: '6fc46277-49f7-448b-af40-960ff1258d46' })
            });
            const data = await oldOrder.json();
            console.log(data);

        //     const updateOrder = {
        //         customerUUID: '6fc46277-49f7-448b-af40-960ff1258d46',
        //         meal: {
        //             name: name,
        //             uuid: id,
        //             description: description,
        //             image: image,
        //             category: category,
        //             quantity: quantity,
        //             price: price,
        //         }
        //     }

        //     console.log(updateOrder);
        //     const response = fetch(`http://localhost:8000/order/update`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(updateOrder)
        //     });
        //     console.log(response);
        }
    }

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
                            <h2>{price} €</h2>
                            <p>{description}</p>
                            <Grid alignItems='center' columns={{ xs: 3, sm: 4, md: 8 }} spacing={2} container>
                                <Grid item>
                                    <Button onClick={addToCart} variant="outlined">Ajouter au panier</Button>
                                </Grid>
                                <Grid item xs={1} sm={2} md={2}>
                                    <TextField value={quantity} onChange={updateQuantity} className="detail-quantite" size="small" InputProps={{ inputProps: { min: 1, max: 9 } }} label="Quantité" type="number" />
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