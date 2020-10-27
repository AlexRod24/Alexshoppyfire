import React, { useEffect, useState } from 'react';
import { CardDeck, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Slider from './Slider';
import HomeCard from './HomeCard';
import { getFirestore } from "../firebase";
import PageLoader from './PageLoader';


 /* Titulos del la app */
export const Titulo = (props) => {
    return (
        <h2 className="heading01">{props.texto}</h2>
    );
}

 /* Subtitulos del la app */
export const Subtitulo = (props) => {
        return (
            <div>
                <h2 className="heading03">{props.texto}</h2>
                <br/>
                <Button
                    variant='outline-primary'
                    className='mr-2'>
                        <Link  to={"/productos"}>
                            Ir a Productos
                        </Link>
                </Button>
            </div>
        );
    }


export default function Home() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    /* Inicializa el llamado a Firebase y trae la info de los Items con isPromo = true */
    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection('items');
        const homeCards = itemCollection.limit(8);
        homeCards.get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    console.log('No se han encontrado resultados');
                }
                setItems(querySnapshot.docs.map(doc => {
                    return ({ id: doc.id, ...doc.data()});
                }));
                
            }).catch((error) => {
            console.log('Hubo un error en la búsqueda', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    if(loading){
        return <PageLoader/>
     }
     


    return(
        <div style={{backgroundColor:'#f6f6f6', paddingBottom:'80px'}}>
            <Slider
                data={items}
            />
            <Titulo texto="Nuestras Promos"/>
            <CardDeck>
                        {
                        items.map(item =>
                            item.isPromo ?
                            <HomeCard
                                key={item.id}
                                datos={item}
                            /> : null
                            )
                        }
            </CardDeck>
            <Titulo texto="Todos Nuestros Productos"/>
            <CardDeck>
                        {
                        items.map(item =>
                            <HomeCard
                                key={item.id}
                                datos={item}
                            />
                            )
                        }
            </CardDeck>
        </div>
        );
}
