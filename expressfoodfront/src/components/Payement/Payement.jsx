import { Button, Stack, Paper } from "@mui/material"
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';

import "./Payement.css"

const DemoPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    ...theme.typography.body2,
    textAlign: 'center',
}));

function Payement() {


    const [order, setOrder] = useState([]);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [total, setTotal] = useState(0);

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


        setOrder(data[0]);
        const totalPrices = data[0].meal.map((item) => parseFloat(item.price) * item.quantity);
        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
        setTotalPrice(totalPrice);

        
        if ( totalPrice > 19.99 ) {
            setDeliveryFee('Gratuit');
            setTotal(totalPrice);
        } else {
            setDeliveryFee(2.99);
            setTotal(totalPrice + 2.99);
        }
        
    }

    console.log(order);

    function Payement() {
        window.location.href = "/product";

        const updateOrder = {
            uuid: '09a8d6fe-a06a-4946-aec1-178bf0ae0663',
            status: 'Paid'
        };

        const response = fetch(`http://localhost:8000/order/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateOrder)
        });
    }


    return (

        <div className="payement">
            <Stack direction="row" spacing={2}>
                <DemoPaper square={false}>
                    <h2>Récapitulatif de la commande</h2>
                    <p>Montant de la commande : {totalPrice} EUR</p>
                    <p>Frais de la livraison : {deliveryFee} </p>
                    <p>Total : {total} EUR</p>
                    <Button onClick={Payement} variant="contained">Payer la commande</Button>
                </DemoPaper>
            </Stack>
        </div>
    )
}

export default Payement