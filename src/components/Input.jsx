import React from 'react';
import { Form } from "react-bootstrap";

export default function Input(props){
    return(
        <Form.Control type="text" onChange={props.handleChange} value={props.conteo}/>
    )
}
