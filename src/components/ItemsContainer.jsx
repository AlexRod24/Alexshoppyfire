import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import ItemDetail from './ItemDetail';
import { Titulo } from './Home';
import { CardDeck } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { getFirestore } from "../firebase";
import { CartContext } from "../context/CartContext";
import PageLoader from './PageLoader';



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
                    console.log('No se han encontrado resultados');
                }
                setItems(querySnapshot.docs.map(doc => {
                    return ({ id: doc.id, ...doc.data() });
                }));
            }).catch((error) => {
            console.log('Hubo un error en la búsqueda', error);
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
            }
            else{
                const find = (e) => e[0] === itemActual.id;
                const idCheck = cartCantItem.findIndex(find);

                setCartCantItem( current =>
                    [...current, [cartCantItem[idCheck][0], estadoContador]]
                );
            }
    };


    if(loading){
        return <PageLoader/>
    }


    return(
        <div style={{backgroundColor:'#f6f6f6', padding:'30px 0 80px 0'}}>  
            <Switch>
                <Route path="/productos/:id">
                    <ItemDetail
                    conteoActual={addToCart}
                    />
                </Route>
                <Route path="/productos">
                     <Titulo texto="Nuestros Productos"/>
                    <CardDeck>
                        {
                        items.map(item =>
                            <ItemCard
                                key={item.id}
                                datos={item}
                                conteoActual={addToCart}
                            />
                            )
                        }
                    </CardDeck>
                </Route>
            </Switch>
        </div>
    )
}
