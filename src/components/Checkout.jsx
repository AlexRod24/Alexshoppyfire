import React, { useState } from 'react';
import { CartContext } from '../context/CartContext'
import { Button, Card, Col, Row, Form, Modal, Table} from "react-bootstrap";
import { getFirestore } from "../firebase";
import * as firebase from 'firebase/app';
import { Titulo } from './Home';
import 'firebase/firestore';
import { Link } from "react-router-dom";
import PageLoader from './PageLoader';



export default function Checkout(){

    const { value1, value2, value3 } = React.useContext(CartContext);
    const [cart, setCart] = value1;
    const [cartCant, setCartCant] = value2;
    const [cartCantItem, setCartCantItem] = value3;
    const [userInfo, setUserInfo] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    var itemId;
 

    /* Devuelve la cantidad de items por producto */
    const itemCantidad = (e) => {
        itemId = e;
        const idCheck = cartCantItem.map(function (el) { return el });
        const sumCartCant = idCheck.filter(function (item) { return item[0] === e});
        const sumCartCantResult = sumCartCant.map(function (el) { return el[1] });
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return sumCartCantResult.reduce(reducer);
    };


    /* Devuelve el Precio total */
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
            buyer: userInfo,
            items: cartInfoSend(),
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: totalPrice()
        };
        orders.add(newOrder)
            .then(({id}) => {
                setOrderId(id);
                /* Actualiza el stock de cada producto comprado */
                const batch = db.batch();
                cart.map(function (el) {
                    return batch.update(db.collection('items').doc(el.id), {
                            stock: el.stock - itemCantidad(el.id)
                        });
                    })
                batch.commit().then(r => r);
            }).catch(err => {
            console.log('Hubo un error al buscar el item', err);
            }).finally(() => {
                setLoading(false);
                setModal(true);
                setCart([]);
                setCartCant(0);
                setCartCantItem([]);
            });
        };


    if(loading){
        return <PageLoader/>
    }
    

    if(modal){
        return <Modal
                show={modal}
                onHide={handleCloseModal}
                animation={false}>
                    <Modal.Header>
                        <Modal.Title
                            className='modal-title'>
                            Su compra fue realizada con éxito
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='modal-p'>
                            Su orden fue procesada con número de Id: {orderId}
                        </p>
                        <p className='modal-p'>
                            Gracias por su compra.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary">
                            <Link
                                to={"/pedidos"}
                                style={{color:'#ffffff'}}
                                >Ver el pedido
                            </Link>
                        </Button>
                    </Modal.Footer>
                </Modal>
    }

    return (
     <Card style={{width: '75%', margin: '50px auto', padding:'60px'}}>
         <Titulo texto="Checkout"/>
         <Row style={{margin: '40px auto'}}>
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
                 <Table className='form-table'>
                     <thead>
                     <tr>
                         <th>Cant.</th>
                         <th>Imagen</th>
                         <th>Producto</th>
                         <th>Precio</th>
                     </tr>
                     </thead>
                     <tbody>
                         {cart.map(el => {
                         return <tr key={el.id}>
                             <td style={{width:'20%'}}>{itemCantidad(el.id)}</td>
                             <td>
                                 <Card.Img
                                    style={{width:'30%'}}
                                    variant="top"
                                    src={el.thumbnail}
                                 />
                             </td>
                             <td style={{width:'30%'}}>{el.title}</td>
                             <td style={{width:'20%'}}>${el.price}</td>
                         </tr>})
                         }
                     </tbody>
                     <thead className='total-checkout'>
                     <tr>
                         <th>Cant. items: {cartCant}</th>
                         <th>&nbsp;</th>
                         <th>&nbsp;</th>
                         <th>Precio Final: ${totalPrice()}</th>
                     </tr>
                     </thead>
                 </Table>
             </Col>
         </Row>
     </Card>
 )
}

