import { Button, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {

    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
     
        getOrder();

    }, [])

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


    const deleteItem = async (id) => {

        const newOrder =  order.filter((item) => item.uuid !== id);
        
        const updateOrder = {
            uuid: '09a8d6fe-a06a-4946-aec1-178bf0ae0663',
            meal: newOrder,
        };


        console.log(updateOrder);

        const response = await fetch(`http://localhost:8000/order/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateOrder)
        });

        getOrder();

    }

    function updateQuantity(item) {
        
        const newOrder = order.map((orderItem) => {
            if (orderItem.uuid === item.uuid) {
                orderItem.quantity = parseInt(event.target.value);
            }
            return orderItem;
        });


        const updateOrder = {
            uuid: '09a8d6fe-a06a-4946-aec1-178bf0ae0663',
            meal: newOrder,
        };


        const response = fetch(`http://localhost:8000/order/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateOrder)
        });

        // getOrder();
        setOrder(newOrder);

        const totalPrices = newOrder.map((item) => parseFloat(item.price) * item.quantity);
        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
        setTotalPrice(totalPrice);
    }

    function goPayement() {
        window.location.href = "/payement";

        // const updateOrder = {
        //     uuid: '09a8d6fe-a06a-4946-aec1-178bf0ae0663',
        //     status: 'CartValidated'
        // };


        // const response = fetch(`http://localhost:8000/order/update`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(updateOrder)
        // });
    }


    return (
        <div className="cart">
            <h1>Détail de la commande</h1>
            <Grid container justifyContent='space-between' columns={{ xs: 1, sm: 1, md: 12 }}>
                <Grid item xs={1} sm={1} md={7}>
                    <List>
                        {order.map((item, index) => (
                            <div key={index}>
                                <ListItem secondaryAction={<IconButton edge="end" onClick={() => deleteItem(item.uuid)}> <DeleteIcon /> </IconButton>}>
                                    <ListItemText className="cart-list-text" primary={item.name} />
                                    <Divider className="cart-divider" orientation="vertical" flexItem />                                    
                                    <TextField value={item.quantity} onChange={ ()=> updateQuantity(item) } size="small" InputProps={{ inputProps: { min: 1, max: 99 } }} label="Quantité" type="number" />
                                    <Divider className="cart-divider" orientation="vertical" flexItem />
                                    <ListItemText className="cart-list-text" primary={`Total: ${parseFloat(item.price) * item.quantity} EUR`} />
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </Grid>
                <Grid border={1} padding={2} item direction='column' alignItems='flex-start' justifyContent='center' xs={1} sm={1} md={4}>
                    <h2>Montant de la commande: {totalPrice} € </h2>
                    <Button onClick={goPayement} variant="contained">Passer au paiement</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cart