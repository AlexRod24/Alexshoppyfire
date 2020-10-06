import React from 'react';
import { Card } from "react-bootstrap";


export function Saludo(props) {
    return (
        <h1 className="heading01">{props.texto}</h1>
    );
}

export function Bienvenida(props) {
    return (
        <h2 className="heading02">{props.texto}</h2>
    );
}

export default function Home() {
    return(
        <Card style={{width: '30rem', padding: '50px'}}>
            <Card.Body>
                <Card.Title>
                    <Saludo texto="Hola!"/>
                </Card.Title>
                    <Bienvenida texto="Bienvenidos a nuestra tienda online"/>
            </Card.Body>
        </Card>
        );
}
