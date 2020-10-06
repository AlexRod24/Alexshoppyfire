import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import ItemDetail from './ItemDetail';
import { CardDeck } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getFirestore } from "../firebase";
import { CartContext } from "../context/CartContext";



export default function ItemsContainer() {

    const { value1, value2, value3 } = React.useContext(CartContext);
    const [cart, setCart] = value1;
    const [cartCant, setCartCant] = value2;
    const [cartCantItem, setCartCantItem] = value3
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);


    /* Inicializa el llamado a Firebase y trae la info de los Items solicitados */
    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection('items');
        itemCollection.get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    console.log('no results');
                }
                setItems(querySnapshot.docs.map(doc => {
                    return ({ id: doc.id, ...doc.data() });
                }));
            }).catch((error) => {
            console.log('Error searching items', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    /* Añade el Item y su cantidad (si ya existe en el Cart, solo añade la cantidad y la suma a la existente en ese item) */
    const addToCart = (estadoContador, itemActual) => {

        setCartCant(currentCartCant =>  currentCartCant + parseInt(estadoContador));

        const cartCantArray = [];
        let i;
        for (i = 0; i < cart.length; i++) {
            cartCantArray.push(cart[i].id)
        }

            if(!cartCantArray.includes(itemActual.id)) {
                setCart(currentCart =>  [...currentCart, itemActual]);
                setCartCantItem(currentCartCantItem =>  [...currentCartCantItem, [itemActual.id, estadoContador]]);
                console.log("agregado");
            }
            else{
                const find = (e) => e[0] === itemActual.id;
                const idCheck = cartCantItem.findIndex(find);

                setCartCantItem( current =>
                    [...current, [cartCantItem[idCheck][0], estadoContador]]
                );
                console.log("no agregado");
            }
    };


    if(loading){
        return <div style={{fontSize: '18px', color:'#fff'}}>Cargando información...</div>
    }


    return(
        <BrowserRouter>
            <Switch>
                <Route path="/productos/:id">
                    <ItemDetail data={items} conteoActual={addToCart}/>
                </Route>
                <Route path="/productos">
                    <CardDeck style={{width:'1270px', margin: '30px 30px 50px'}}>
                 {
                   items.map(item =>
                      <ItemCard key={item.id} datos={item} conteoActual={addToCart}/>
                      )
                  }
                    </CardDeck>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}