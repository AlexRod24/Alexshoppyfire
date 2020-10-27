import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import ItemsContainer from "./components/ItemsContainer";
import { CartProvider } from './context/CartContext';
import Checkout from "./components/Checkout";
import Pedidos from "./components/Pedidos";
import style from 'bootstrap/dist/css/bootstrap.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <CartProvider>
                <Navbar/>
                      <Switch>
                              <Route exact path="/">
                                  <Home/>
                              </Route>
                              <Route path="/productos">
                                  <ItemsContainer/>
                              </Route>
                              <Route path="/carrito">
                                  <Cart/>
                              </Route>
                              <Route path="/pedidos">
                                  <Pedidos/>
                              </Route>
                              <Route path="/checkout">
                                  <Checkout/>
                              </Route>
                      </Switch>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}


