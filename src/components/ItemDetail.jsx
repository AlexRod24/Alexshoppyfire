import React from 'react';
import {Card, Row, Col, ListGroup, Table, Button} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Contador from "./Contador";


export default function ItemDetail(props) {


    const { id } = useParams();
    const x = props.data.map(e => e.id).indexOf(id);
    const conteoActual = (e) => {
        props.conteoActual(e, props.data[x]);
    }


    return <Card style={{width: '75%', margin: '50px auto 50px auto'}}>

        <Row>
            <Col>
                <Card.Img style={{width: '100%', margin: '50px auto 5px auto'}} variant="top" src={props.data[x].thumbnail} />
            </Col>
            <Col>
                <Card.Body style={{margin: '50px 0px'}}>
                    <Card.Title style={{fontSize: '32px', color:'#477ec0', textAlign:'left'}}>{props.data[x].title}</Card.Title>
                    <Card.Title style={{fontSize: '22px', color:'#000', textAlign:'left'}}>{props.data[x].subtitle}</Card.Title>
                    <Card.Text style={{fontSize: '29px', color:'#000', textAlign:'left'}}>
                        ${props.data[x].price}
                    </Card.Text>
                    <ListGroup variant="flush" >
                        {
                            props.data[x].itemsDetail.map(itemDetail => {
                                return <ListGroup.Item style={{fontSize: '12px', color:'#8e8e8e', textAlign:'left', paddingLeft: '0rem!important'}}>{itemDetail}</ListGroup.Item>
                            })
                        }
                    </ListGroup>
                    <Card.Text style={{fontSize: '13px', color:'#000', textAlign:'left'}}>
                        <br/>Unidades en stock: {props.data[x].stock}
                    </Card.Text>
                </Card.Body>
            </Col>
            <Col>
                    { props.data[x].stock !== 0 ?
                        <div>
                            <Contador sendConteo={conteoActual} style={{float: 'right', display:'block'}}/>
                        </div> :
                        <div style={{padding:'50px'}}>
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
            </Col>
        </Row>

        <Row style={{margin: '15px 0px'}}>
            <Col>
                <Card.Body>
                    <Card.Text style={{fontSize: '14px', color:'#000', textAlign:'left'}}>
                        {props.data[x].detail}
                    </Card.Text>
                </Card.Body>
            </Col>
            <Col>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}>Marca</th>
                        <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}>Modelo</th>
                        <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}>Línea</th>
                        <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}>Color</th>
                    </tr>
                    </thead>
                    <tbody>
                     <tr>
                                <td style={{fontSize: '13px', color:'#000', textAlign:'left', paddingLeft: '0rem!important'}}>{props.data[x].itemsTable.marca}</td>
                                <td style={{fontSize: '13px', color:'#000', textAlign:'left', paddingLeft: '0rem!important'}}>{props.data[x].itemsTable.modelo}</td>
                                <td style={{fontSize: '13px', color:'#000', textAlign:'left', paddingLeft: '0rem!important'}}>{props.data[x].itemsTable.linea}</td>
                                <td style={{fontSize: '13px', color:'#000', textAlign:'left', paddingLeft: '0rem!important'}}>{props.data[x].itemsTable.color}</td>
                                </tr>

                    </tbody>
                </Table>

            </Col>
        </Row>
    </Card>

}
