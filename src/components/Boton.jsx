import React from 'react';
import { Button } from 'react-bootstrap';

const Boton = (props) => {
    return (
        <Button style={{fontSize:'14px'}} variant='outline-primary' className='mr-2' onClick={props.funcion}>{props.contenido}</Button>
    );
}

export default Boton;