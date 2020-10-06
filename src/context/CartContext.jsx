import React, { useState } from 'react';

export const CartContext = React.createContext([]);

export const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    const [cartCant, setCartCant] = useState(0);
    const [cartCantItem, setCartCantItem] = useState([]);

    return (
        <CartContext.Provider value={{value1: [cart, setCart], value2: [cartCant, setCartCant], value3: [cartCantItem, setCartCantItem]}}>
            {props.children}
        </CartContext.Provider>
    )
}

