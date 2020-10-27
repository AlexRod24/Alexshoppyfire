import React, { useEffect, useState } from 'react';
import { CardDeck, Card, Accordion, Button } from "react-bootstrap";
import { getFirestore } from "../firebase";
import { Titulo, Subtitulo } from './Home';
import PageLoader from './PageLoader';


export default function Pedidos() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);


    /* Inicializa el llamado a Firebase y trae la info de los Items solicitados */
    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection('orders');
        itemCollection.get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    console.log('No se han encontrado resultados');
                }
                setOrders(querySnapshot.docs.map(doc => {
                    return ( { id: doc.id, ...doc.data() } );
                }));
            }).catch((error) => {
            console.log('Hubo un error en la búsqueda', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    if(loading){
        return <PageLoader/>
     }


    return(
        <Card style={{width: '80rem', padding: '40px', margin:'40px auto'}}>
        <Titulo texto="Tus Pedidos"/>
        { orders.length > 0 ?
        <CardDeck>
            <Accordion>
             { 
               orders.map(order =>
                <Card key={order.id} style={{marginBottom:"15px"}}>
                    <Card.Header>
                        <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={order.id}
                        >
                         N° de Pedido: {order.id}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={order.id}>
                    <Card.Body style={{textAlign:'left'}}>
                    { 
                        order.items.map(item => 
                        <div className='order-table' key={item.id}>
                            <p>Producto: {item.title}</p>
                            <p>ID de item: {item.id}</p>
                            <p>Cantidad: {item.quantity}</p>
                            <p>Precio Unitario: ${item.amount}</p>
                        </div>
                        )
                    } 
                    <Card.Footer>
                        <h5>Monto total de su compra: ${order.total}</h5>
                    </Card.Footer>
                    </Card.Body>
                    </Accordion.Collapse>
                    
                </Card>
               )
            }
            </Accordion>
        </CardDeck> : 
            <Card.Body>
                <Card.Title>
                   <Subtitulo texto="Aún no tienes ninguna Orden"/>
                </Card.Title>
             </Card.Body>
        }
    </Card>
    )
}