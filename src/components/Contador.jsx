import React from "react";
import Boton from './Boton';
import Input from './Input';
import { Form, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


export default class Contador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conteo: 0
        };
        this.conteoMinimo = 0;
        this.conteoMaximo = 10;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            conteo: e.target.value
        });
    }

    handleClick = () => {
        this.props.sendConteo(this.state.conteo);
    }

    sumar = () => {
        if(this.state.conteo < this.conteoMaximo){
            this.setState((state) => ({
                conteo: state.conteo + 1
            }));
        }
    };

    restar = () => {
        if(this.state.conteo > this.conteoMinimo) {
            this.setState((state) => ({
                conteo: state.conteo - 1
            }));
        }
    };

    borrar = () => {
        this.setState( () => ({
            conteo: 0
        }));
    };


    render(){
        return(
            <div style={{width: '20rem', padding: '10px auto', marginTop:'0px'}}>
                <Form.Group>
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <div className={"formControlInput"}>
                            <Input
                                type="text"
                                conteo={this.state.conteo}
                                handleChange={this.handleChange}
                            /></div>
                            <Boton
                                contenido="-"
                                funcion={this.restar}
                            />
                            <Boton
                                contenido="+"
                                funcion={this.sumar}
                            />
                            <Boton
                                contenido="borrar"
                                funcion={this.borrar}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className="align-items-center">
                        {this.state.conteo === 0 ?
                            <Button
                                disabled
                                onClick={this.handleClick}
                                style={{width:'78%', fontSize:'15px'}} variant="primary" size="lg" className='mt-4'>
                                Añadir {this.state.conteo >= 1 ? this.state.conteo : " "} al Carrito
                            </Button> :
                            <Button
                                onClick={this.handleClick}
                                style={{width:'78%', fontSize:'15px'}} variant="primary" size="lg" className='mt-4'>
                                Añadir {this.state.conteo >= 1 ? this.state.conteo : " "} al Carrito
                            </Button>}
                    </Form.Row>
                </Form.Group>
             </div>
        );
    };
};
