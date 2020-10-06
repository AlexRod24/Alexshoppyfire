import React from 'react';
import { Button, Card } from "react-bootstrap";
import Contador from "./Contador";
import { NavLink } from "react-router-dom";



export default function ItemCard(props){

    const conteoActual = (e) => {
        props.conteoActual(e, props.datos);
    }

    return  <Card style={{width:'18rem'}}>
                <Card.Img style={{width: '25%', margin: '50px auto 5px auto'}} variant="top" src={props.datos.thumbnail} />
                <Card.Body>
                    <Card.Title style={{fontSize: '20px', color:'#477ec0'}}>{props.datos.title}</Card.Title>
                    <Card.Title style={{fontSize: '14px', color:'#000'}}>{props.datos.subtitle}</Card.Title>
                    <Card.Text style={{fontSize: '18px', color:'#000'}}>
                        ${props.datos.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    { props.datos.stock !== 0 ?
                        <div>
                            <Contador sendConteo={conteoActual}/>
                            <small
                                style={{fontSize: '13px', color:'#c9c9c9'}}
                                className="text-muted">
                                Unidades en stock: {props.datos.stock}
                            </small>
                        </div> :
                        <div>
                            <Card.Title style={{fontSize: '18px', color:'#477ec0'}}>Producto sin stock</Card.Title>
                            <Button
                            style={{width:'78%', marginBottom:'12px', fontSize: '14px'}}
                            variant="outline-primary"
                            size="lg"
                            className='mt-4'
                            >Avisarme cuando esté disponible
                            </Button>
                        </div>
                    }
                    <Button
                        style={{width:'78%', marginBottom:'12px'}}
                        variant="outline-primary"
                        size="lg"
                        className='mt-4'
                    >
                     <NavLink
                         to={`/productos/${props.datos.id}`}
                         style={{color:'#477ec0', fontSize: '14px'}}>
                         Ver detalle
                     </NavLink>
                    </Button>
                </Card.Footer>
            </Card>
}

