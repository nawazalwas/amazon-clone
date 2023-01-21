import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './ProductDetails.css';
import { AmazonUseContext } from './StateProvider';

const baseURL = "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products";

function ProductDetails() {
    const [details, setDetails] = useState();
    const [{ user, cart }, dispatch] = AmazonUseContext();
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        axios.get(`${baseURL}/${id}`).then((response) => {
            setDetails({ ...response.data, quantity: 1 });
            console.log();
        });
    }, [])
    function addToBasket() {
        if (details) {
            dispatch({
                type: 'ADD_TO_CART',
                item: { ...details }
            });
        }


    }

    function buyNow() {
        if (details) {
            dispatch({
                type: 'ADD_TO_CART',
                item: { ...details }
            });
            navigate('/checkout', { replace: true });
        }

    }




    return details && (
        <div className='productdetails'>

            <div className='productdetails_left'>
                <img
                    className='productdetails_image'
                    src={details?.image}
                    alt=''
                />
            </div>
            <div className='productdetails_right'>
                <div className='productdetails_info'>
                    <h1 className='productdetails_title'>{details?.title}</h1>
                    <p className='productdetails_category'>in {details?.category}</p>

                    <p className='productdetails_price'>
                        <small className='productdetails_price_currency'>$</small>
                        <strong className='productdetails_price_value'>{details?.price}</strong>
                    </p>
                    <div className='productdetails_rating'>
                        {details && Array(Math.floor(details?.rating.rate - 0))
                            .fill()
                            .map((_, i) => (
                                <p key={i}>🌟</p>
                            ))}
                    </div>
                    <div className='productdetails_post'>{details?.rating.count}</div>
                </div>
                <div className='checkoutproduct_quantity'>
                    <button
                        className='checkoutproduct_quantity_increment'
                        onClick={() => { details && setDetails({ ...details, quantity: details?.quantity + 1 }) }}
                    >+</button>

                    <input
                        className='checkoutproduct_quantity_input'
                        value={details?.quantity}
                        disabled />

                    <button
                        className='checkoutproduct_quantity_decrement'
                        onClick={() => { details && setDetails({ ...details, quantity: details?.quantity - 1 }) }}
                        disabled={details?.quantity === 1 ? true : false}
                    >-</button>

                </div>
                <div className='productdetails_btn'>
                    <Link to={'/checkout'}>
                        <button className='productdetails_buynow_btn' onClick={buyNow}>Buy now</button>
                    </Link>
                    <button className='productdetails_addcart_btn' onClick={addToBasket}>Add to cart</button>
                </div>
                <div className='productdetails_description'>
                    <h3>Description :</h3>
                    <p>{details?.description}</p>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails;