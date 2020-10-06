import React, { useState } from 'react';
import { CartContext } from '../context/CartContext'
import { Button, Card, Col, Row, Form, Modal, Table} from "react-bootstrap";
import { getFirestore } from "../firebase";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {Link} from "react-router-dom";



export default function Checkout(){

    const { value1, value2, value3 } = React.useContext(CartContext);
    const [cart, setCart] = value1;
    const [cartCant, setCartCant] = value2;
    const [cartCantItem, setCartCantItem] = value3;
    const [userInfo, setUserInfo] = useState({name:'', phone:'', email:''});
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);


    /* Devuelve la cantidad de items por producto */
    const itemCantidad = (e) => {
        itemId = e;
        const idCheck = cartCantItem.map(function (el) { return el });
        const sumCartCant = idCheck.filter(function (item) { return item[0] === e});
        const sumCartCantResult = sumCartCant.map(function (el) { return el[1] });
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return sumCartCantResult.reduce(reducer);
    };

    var itemId;

    /* Devuelve el Preio total */
    const totalPrice = () => {
        const array = cart.map(function (el) { return parseInt(el.price.replace('.', '')) * itemCantidad(itemId) });
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return array.reduce(reducer);
    }


    /* Actualiza el estado con los datos ingresados en el Form */
    const handleChangeForm = e => {
        e.persist();
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    /* Cierra el modal */
    const handleCloseModal = () => setModal(false);


    /* Prepara los datos del cart para el envio a firebase */
    const cartInfoSend = () => {
        return cart.map(el => {
            return{
                id: el.id,
                title: el.title,
                amount: el.price,
                quantity: itemCantidad(el.id)
            }
        });
    }

    /* Envía el pedido de compra a Firebase */
   const setOrder = () => {
        setModal(true);
        setLoading(true);

        const db = getFirestore();
        const orders = db.collection('orders');

        const newOrder = {
            buyer: {name:'Alejandro Rodriguez', phone:'03424077800', email:'alexrodrz24@gamil.com'},
            items: cartInfoSend(),
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: totalPrice()
        };
        orders.add(newOrder)
            .then(({id}) => {
                setOrderId(id);
                /* Actualiza el stock de cada producto comprado */
                const batch = db.batch();
                cart.map(el => {
                    const docRef = db.collection('items').doc(el.id);
                    batch.update(docRef, {stock: el.stock - itemCantidad(el.id)});
                })
                batch.commit().then(r => r);
            }).catch(err => {
            console.log('Error searching items', err);
            }).finally(() => {
                setLoading(false);
                setModal(true);
            });
        };


    if(loading){
        return <div style={{fontSize: '18px', color:'#fff'}}>Cargando información...</div>
    }

    if(modal){
        return <Modal show={modal} onHide={handleCloseModal} animation={false}>
            <Modal.Header>
                <Modal.Title style={{fontSize: '16px', color:'#000',textAlign:'left', fontWeight:'700'}}>Su compra fue realizada con éxito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'500'}}>Su orden fue procesada con número de Id: {orderId}</p>
                <p style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'500'}}>Gracias por su compra.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary"><Link to={"/"} style={{color:'#ffffff'}}>Volver al Inicio</Link></Button>
            </Modal.Footer>
        </Modal>
    }

    return (
     <Card style={{width: '75%', margin: '50px auto 50px auto', padding:'55px'}}>
         <h1 className="heading02">Checkout</h1>
         <Row style={{marginBottom: '40px'}}>
             <Col>
                 <Form
                     style={{width: '75%'}}
                     onSubmit={setOrder}
                 >
                     <Form.Group controlId="formBasicEmail">
                         <Form.Control
                             placeholder="Nombre y Apellido"
                             onChange={handleChangeForm}
                             type="text"
                             name="name"
                             value={userInfo.name}
                         />
                     </Form.Group>
                     <Form.Group controlId="formBasicPassword">
                         <Form.Control
                             placeholder="Teléfono"
                             onChange={handleChangeForm}
                             type="text"
                             name="phone"
                             value={userInfo.phone}
                         />
                     </Form.Group>
                     <Form.Group controlId="formBasicEmail">
                         <Form.Control
                             placeholder="Email"
                             onChange={handleChangeForm}
                             type="text"
                             name="email"
                             value={userInfo.email}
                         />
                     </Form.Group>
                     <Button
                         variant="primary"
                         type="submit">
                         Confirmar compra
                     </Button>

                 </Form>
             </Col>
             <Col>
                 <Table>
                     <thead>
                     <tr>
                         <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}>Cant.</th>
                         <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}>Producto</th>
                         <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}></th>
                         <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}></th>
                     </tr>
                     </thead>
                     <tbody>
                         {cart.map(el => {
                         return <tr key={el.id}>
                             <td style={{width: '20%', fontSize: '13px', color:'#000', textAlign:'left', paddingLeft: '0rem!important'}}>{itemCantidad(el.id)}</td>
                             <td style={{fontSize: '13px', color:'#000', textAlign:'left', paddingLeft: '0rem!important'}}>
                                 <Card.Img style={{width: '30%'}} variant="top" src={el.thumbnail}/>
                             </td>
                             <td style={{width: '20%', fontSize: '13px', color:'#000', textAlign:'left', paddingLeft: '0rem!important'}}>${el.price}</td>
                             <td style={{width: '30%', fontSize: '13px', color:'#000', textAlign:'left', paddingLeft: '0rem!important'}}>{el.title}</td>
                         </tr>})
                         }
                     </tbody>
                     <thead>
                     <tr>
                         <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}>N° de items: {cartCant}</th>
                         <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}></th>
                         <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}>Total: ${totalPrice()}</th>
                         <th style={{fontSize: '13px', color:'#000',textAlign:'left', fontWeight:'700'}}></th>
                     </tr>
                     </thead>
                 </Table>
             </Col>
         </Row>
     </Card>
 )
}

