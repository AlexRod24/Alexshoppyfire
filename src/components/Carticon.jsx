import React from 'react';
import {DropdownButton, Dropdown, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { CartContext } from '../context/CartContext';

const CartIcon = () => {

    const { value1, value2 } = React.useContext(CartContext);
    const [cart, setCart] = value1;
    const [cartCant, setCartCant] = value2;

    return (
        <div className="cartButton">
            <DropdownButton
                alignRight
                title= {cartCant}
                id="dropdown-menu-align-right"
                className="cartButtonIcon"
            >
                { cart.length >= 1 ? <Dropdown.Item>Items agregados: {cartCant}</Dropdown.Item> : <Dropdown.Item>Su carrito se encuentra vacío</Dropdown.Item>}
                <Dropdown.Divider />
                <Button variant="outline-primary" style={{marginLeft:'70px' }}><Link to={'/carrito'}>Ir al carrito</Link></Button>
            </DropdownButton>
        </div>

    );

}

export default CartIcon;
