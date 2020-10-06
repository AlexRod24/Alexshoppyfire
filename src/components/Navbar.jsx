import React from 'react';
import CartIcon from './Carticon';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import style from 'bootstrap/dist/css/bootstrap.css';


class MyNav extends React.Component{
    render(){
        return(
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">E-shop</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink to={"/productos"}>Productos</NavLink>
                </Nav>
            <CartIcon/>
            </Navbar>
        )
    }
}

export default MyNav;