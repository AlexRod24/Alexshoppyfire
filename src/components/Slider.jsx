import React from 'react';
import { Button, Carousel, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const Slider = (props) => {

    const sliderRef = React.createRef();

    return (
        <Carousel ref={sliderRef}>
             {
              props.data.map(item =>
                item.isPromo ?
                <Carousel.Item
                    key={item.id}
                    interval={1200}
                >
                <Row>
                    <Col>
                        <img
                        style={{margin: '5px auto 5px auto'}}
                        className="d-block w-35"
                        src={item.thumbnail} 
                        alt="productoPromo"
                        />
                    </Col>
                    <Col>
                        <Carousel.Caption>
                            <h1 style={{color:'#007bff'}}>{item.title}</h1>
                            <h4>{item.subtitle}</h4>
                         <Button
                            style={{width:'25%', marginBottom:'12px'}}
                            size="md"
                            className='mt-4'
                        >
                        <NavLink
                            to={`/productos/${item.id}`}
                            style={{color:'#477ec0', fontSize: '14px'}}>
                            Ver
                        </NavLink>
                        </Button>
                        </Carousel.Caption>
                    </Col>
                </Row>
                 </Carousel.Item> : null
                 )
            }
         </Carousel>
    )
};

export default Slider;