import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Contador from "./Contador";
import { getFirestore } from "../firebase";
import PageLoader from './PageLoader';



export default function ItemDetail(props) {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const conteoActual = (e) => {
        props.conteoActual(e, product);
    }

    
        /* Inicializa el llamado a Firebase y trae la info del Producto solicitado */
        useEffect(() => {
            setLoading(true);
            const db = getFirestore();
            const itemCollection = db.collection('items');
            const item = itemCollection.doc(id);

            item.get()
                .then((doc) => {
                    if (!doc.exists) {
                        console.log('No se han encontrado resultados');
                    }
                    setProduct( doc.data() );
                }).catch((error) => {
                console.log('Hubo un error en la búsqueda', error);
            }).finally(() => {
                setLoading(false);
            });
        }, [id]);

        
    if(loading){
        return <PageLoader/>
     }


      return (
      <Card style={{width: '70%', margin: '50px auto', padding:'80px'}}>
        <Row>
            <Col>
                <Card.Img style={{width: '100%', margin: '50px auto 5px auto'}} variant="top" src={product.thumbnail} />
            </Col>
            <Col>
                <Card.Body style={{margin: '50px 0px'}}>
                    <Card.Title
                        className='card-title-item'
                        style={{fontSize: '32px'}}>
                        {product.title}
                    </Card.Title>
                    <Card.Title
                        className='card-text-item'
                        style={{fontSize: '22px'}}>
                        {product.subtitle}
                    </Card.Title>
                    <Card.Text
                        className='card-text-item'
                        style={{fontSize: '29px'}}>
                        ${product.price}
                    </Card.Text>
                    <Card.Text
                        style={{fontSize: '13px'}}>
                        <br/>Unidades en stock: {product.stock}
                    </Card.Text>
                </Card.Body>
            </Col>
            <Col>
                    { product.stock !== 0 ?
                        <div className='wrapper-contador'>
                            <Contador
                                sendConteo={conteoActual}
                                stock={product.stock}
                            />
                        </div> :
                        <div style={{padding:'50px'}}>
                            <Card.Title
                                className='card-title-item'>
                                Producto sin stock
                            </Card.Title>
                            <Button
                                style={{width:'78%', marginBottom:'12px', fontSize: '14px'}}
                                variant="outline-primary"
                                size="lg"
                                className='mt-4'
                            >Avisarme cuando esté disponible
                            </Button>
                        </div>
                    }
            </Col>
        </Row>
        <Row style={{margin: '15px 0px'}}>
            <Col>
                <Card.Body>
                    <Card.Text className='card-text-item'>
                        {product.detail}
                    </Card.Text>
                </Card.Body>
            </Col>
        </Row>
    </Card>)
}
