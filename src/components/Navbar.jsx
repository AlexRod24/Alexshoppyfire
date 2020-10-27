import React from 'react';
import CartIcon from './Carticon';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class MyNav extends React.Component{

    render(){
        return(
            <Navbar>
                <Navbar.Brand href="/">ShoppyFire</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink to={"/productos"}>Productos</NavLink>
                    <NavLink to={"/pedidos"}>Mis Pedidos</NavLink>
                </Nav>
            <CartIcon/>
            </Navbar>
        )
    }
}

export default MyNav;