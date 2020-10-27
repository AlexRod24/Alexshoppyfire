import React from 'react';
import { DropdownButton, Dropdown, Button, Table, Card } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { CartContext } from '../context/CartContext';

const CartIcon = () => {

    const { value1, value2, value3 } = React.useContext(CartContext);
    const [cart] = value1;
    const [cartCant] = value2;
    const [cartCantItem] = value3;

        /* Devuelve la cantidad de items por producto */
        const itemCantidad = (e) => {
            const idCheck = cartCantItem.map(function (el) { return el });
            const sumCartCant = idCheck.filter(function (item) { return item[0] === e});
            const sumCartCantResult = sumCartCant.map(function (el) { return el[1] });
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            return sumCartCantResult.reduce(reducer);
        };

    return (
        <div className="cartButton">
            <DropdownButton
                alignRight
                title= {cartCant}
                id="dropdown-menu-align-right"
                className="cartButtonIcon"
            >  {/* Renderiza el listado del Carrito en al CartIcon del Nav */}
                { cart.length >= 1 ?
                    <Dropdown.Item>
                        { cart.length !== 0 || cart[0][0] || cart[0][1] ?
                        <Table className='table-cart'>
                            <thead>
                            <tr>
                                <th>Cant.</th>
                                <th>Imagen</th>
                                <th>Item</th>
                                <th>Precio Unit.</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                cart.map(producto =>
                                !producto[0] || !producto[1]  ?
                                <tr key={producto.id}>
                                    <td>{itemCantidad(producto.id)}</td>
                                    <td>
                                        <Card.Img
                                            style={{width: '50%'}}
                                            variant="top"
                                            src={producto.thumbnail}
                                        />
                                        </td>
                                    <td>{producto.title}</td>
                                    <td>{producto.price}</td>
                                </tr> : null
                                )
                            }
                            </tbody>
                        </Table> : null }
                    </Dropdown.Item> : 
                    <Dropdown.Item>
                        Su carrito se encuentra vacío
                    </Dropdown.Item>
                }
                <Button
                    variant="outline-primary"
                    style={{margin:'20px 60px'}}>
                    <Link
                        to={'/carrito'}>
                        Ir al carrito
                    </Link>
                </Button>
            </DropdownButton>
        </div>

    );

}

export default CartIcon;
