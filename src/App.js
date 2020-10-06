import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import ItemsContainer from "./components/ItemsContainer";
import { CartProvider } from './context/CartContext';
import Checkout from "./components/Checkout";


export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <CartProvider>
                <Navbar/>
                    <header className="App-header">
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
                              <Route path="/checkout">
                                  <Checkout/>
                              </Route>
                      </Switch>
                    </header>
        </CartProvider>
      </BrowserRouter>
    </div>

  );
}


