import React from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button, Card, Table } from "react-bootstrap";
import { Saludo } from './Home';



export default function Cart() {

    const { value1, value2, value3 } = React.useContext(CartContext);
    const [cart, setCart] = value1;
    const [cartCant, setCartCant] = value2;
    const [cartCantItem, setCartCantItem] = value3;


    /* Devuelve la cantidad de items por producto */
    const itemCantidad = (e) => {
        const idCheck = cartCantItem.map(function (el) { return el });
        const sumCartCant = idCheck.filter(function (item) { return item[0] === e});
        const sumCartCantResult = sumCartCant.map(function (el) { return el[1] });
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return sumCartCantResult.reduce(reducer);
    };


    /* Borra el producto seleccionado y actualiza todas las cantidades */
    function eraseItem(e){
        e.persist();
        const idCheck = cart.map(function (el) { return el.id });
        const c = idCheck.indexOf(e.target.value);
        const idCheck2 = cartCantItem.map(function (el) { return el });
        const sumCartCant2 = idCheck2.filter(function (item) { return item[0] === e.target.value})

        setCartCantItem( currentCartCantItem => cartCantItem.length !== 0 ? [ ...currentCartCantItem.filter(i => !sumCartCant2.includes(i)) ] : []);
        setCartCant( currentCartCant => cartCantItem.length !== 0 && typeof cartCantItem !== 'undefined' ? currentCartCant - itemCantidad(e.target.value) : 0);
        setCart( cartItem => cart.length !== 0 ? [ ...cartItem.splice(c,1) , ...cartItem ] : []);
    }


    function Bienvenida(props) {
        return (
            <h2 className="heading02">{props.texto} {cartCant}</h2>
        );
    }

    function Bienvenida2() {
        return (
            <div>
                <h2 className="heading02">No hay items agregados en tu carrito</h2>
                <br/>
                <Button variant='outline-primary' className='mr-2'><Link  to={"/productos"}>Ir a Productos</Link></Button>
            </div>
        );
    }

    return (
        <Card style={{width: '70rem', padding: '40px'}}>

            { cartCant !== 0 ?
            <Card.Body>
                <Card.Title>
                    <Saludo texto="Carrito"/>
                    <Bienvenida texto="Items totales añadidos:"/>
                    <Button variant='outline-primary' className='mr-2 mt-5'><Link  to={"/checkout"}>Finalizar compra</Link></Button>
                </Card.Title>

                { cart.length !== 0 || cart[0][0] || cart[0][1] ?
                <Table style={{marginTop:'40px'}} striped hover>
                    <thead>
                    <tr>
                        <th style={{fontSize: '16px', color:'#c7c7c7', fontWeight:'400'}}>Cantidad</th>
                        <th style={{fontSize: '16px', color:'#c7c7c7', fontWeight:'400'}}>Imagen</th>
                        <th style={{fontSize: '16px', color:'#c7c7c7', fontWeight:'400'}}>Detalle</th>
                        <th style={{fontSize: '16px', color:'#c7c7c7', fontWeight:'400'}}>Precio</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cart.map(producto =>
                           !producto[0] || !producto[1]  ?
                        <tr key={producto.id}>
                            <td style={{fontSize: '16px', color:'#000', fontWeight:'500'}}>{itemCantidad(producto.id)}</td>
                            <td><Card.Img style={{width: '30%'}} variant="top" src={producto.thumbnail}/></td>
                            <td style={{fontSize: '16px', color:'#000', fontWeight:'500'}}>{producto.title}</td>
                            <td style={{fontSize: '16px', color:'#000', fontWeight:'500'}}>{producto.price}</td>
                            <td><Button variant='outline-primary' value={producto.id} className='mr-2' onClick={eraseItem}>Eliminar</Button></td>
                        </tr> : null
                        )
                    }
                    </tbody>
                </Table> : null }

            </Card.Body> :
                <Card.Body>
                    <Card.Title>
                        <Saludo texto="Carrito"/>
                        <Bienvenida2/>
                    </Card.Title>
                </Card.Body> }
        </Card>
    );
}
