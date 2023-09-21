import { Button, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import "./Cart.css";

function Cart() {

    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {

        const getOrder = async () => {
            const response = await fetch(`http://localhost:8000/order/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customerUUID: '6fc46277-49f7-448b-af40-960ff1258d46' })
            });
            const data = await response.json();
            setOrder(data[0].meal);
            const totalPrices = data[0].meal.map((item) => parseFloat(item.price) * item.quantity);
            const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
            setTotalPrice(totalPrice);
        }

        getOrder();

    }, [])

   return (
        <div className="cart">
            <h1>Détail de la commande</h1>
            <Grid container justifyContent='space-between' columns={{ xs: 1, sm: 1, md: 12 }}>
                <Grid item xs={1} sm={1} md={7}>
                    <List>
                        {order.map((item, index) => (
                            <div key={index}>
                                <ListItem secondaryAction={<IconButton edge="end" aria-label="delete"> <DeleteIcon /> </IconButton>}>
                                    <ListItemText primary={item.name} secondary={`Quantité: ${item.quantity} `} />
                                    <ListItemText primary={`Unité: ${item.price}`} />
                                    <ListItemText primary={`Total: ${parseFloat(item.price) * item.quantity} EUR`} />
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </Grid>
                <Grid border={1} padding={2} item direction='column' alignItems='flex-start' justifyContent='center' xs={1} sm={1} md={4}>
                    <h2>Montant de la commande: {totalPrice} € </h2>
                    <Button variant="contained">Passer au paiement</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cart