import React from 'react';
import { Button, Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";



const HomeCard = (props) => {

    return  (
            <Card
                className={`${props.datos.isPromo ? 
                "item-card-promo" : "item-card"}`}
            > 
             { props.datos.isPromo ?
                <Badge
                    variant="secondary">
                    Promo
                </Badge> : null
             }
                <Card.Img style={{width: '50%', margin: '50px auto 5px auto'}} variant="top" src={props.datos.thumbnail} />
                <Card.Body>
                    <Card.Title style={{fontSize: '20px', color:'#477ec0'}}>{props.datos.title}</Card.Title>
                    <Card.Title style={{fontSize: '14px', color:'#000'}}>{props.datos.subtitle}</Card.Title>
                    <Card.Text style={{fontSize: '18px', color:'#000'}}>
                        ${props.datos.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button
                        style={{width:'60%', marginBottom:'12px'}}
                        variant="outline-primary"
                        size="lg"
                        className='mt-4'
                    >
                     <NavLink
                         to={`/productos/${props.datos.id}`}
                         className='navlink'
                     >
                         Ver
                     </NavLink>
                    </Button>
                </Card.Footer>
            </Card>
            )
}

export default HomeCard;