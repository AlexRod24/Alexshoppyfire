import React from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button, Card, Table } from "react-bootstrap";
import { Titulo, Subtitulo } from './Home';


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

        setCartCantItem( currentCartCantItem => 
            cartCantItem.length !== 0 
            ? [ ...currentCartCantItem.filter(i => !sumCartCant2.includes(i)) ] 
            : []);
        setCartCant( currentCartCant => 
            cartCantItem.length !== 0 && typeof cartCantItem !== 'undefined' 
            ? currentCartCant - itemCantidad(e.target.value) 
            : 0);
        setCart( cartItem => 
            cart.length !== 0 
            ? [ ...cartItem.splice(c,1) , ...cartItem ] 
            : []);
    }


    /* Muestra el número de items totales */
    const TotalItems = (props) => {
        return (
            <h2 className="heading02">{props.texto} {cartCant}</h2>
        );
    }
    


    return (
        <Card style={{width: '80rem', padding: '40px', margin:'40px auto'}}>
            <Titulo texto="Tu Carrito"/>
            { cartCant !== 0 ?
            <Card.Body>
                { cart.length !== 0 || cart[0][0] || cart[0][1] ?
                <div>
                    <Table className='table-cart' striped hover>
                        <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th>Imagen</th>
                                <th>Item</th>
                                <th>Precio Unitario</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                            cart.map(producto =>
                            !producto[0] || !producto[1]  ?
                            <tr key={producto.id}>
                                <td>{itemCantidad(producto.id)}</td>
                                <td style={{width:'100px!important'}}>
                                    <Card.Img
                                        style={{width: '15%'}}
                                        variant="top"
                                        src={producto.thumbnail}
                                    />
                                </td>
                                <td>{producto.title}</td>
                                <td>{producto.price}</td>
                                <td>
                                    <Button
                                    variant='outline-primary'
                                    value={producto.id}
                                    className='mr-2'
                                    onClick={eraseItem}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr> : null
                            )
                        }
                    </tbody>
                </Table>
                <Card.Footer>
                    <TotalItems texto="Items totales:"/>
                    <Button
                        variant='outline-primary'
                        className='mr-2 mt-5'
                    >
                        <Link
                            to={"/checkout"}>
                            Finalizar compra
                        </Link>
                    </Button>
                </Card.Footer>
                </div> : null }
            </Card.Body> :
                <Card.Body>
                    <Card.Title>
                        <Subtitulo texto="No hay items agregados"/>
                    </Card.Title>
                </Card.Body> }
        </Card>
    );
}
