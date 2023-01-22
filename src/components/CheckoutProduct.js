import React, { useEffect } from 'react';
import './CheckoutProduct.css';
import Image from './Image';
import { AmazonUseContext } from './StateProvider';
import Title from './Title';

function CheckoutProduct({ id, title, price, rating, image, quantity, hideButton }) {
    const [{user}, dispatch] = AmazonUseContext();
    
    
    const removeFromCart = () => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: id
        });
    }
    const addQuantity = () => {
        dispatch({
            type: 'ADD_QUANTITY',
            id: id
        });
    }
    const removeQuantity = () => {
        dispatch({
            type: 'REMOVE_QUANTITY',
            id: id
        });
    }
    return (
        <div className='checkoutproduct'>
            <Image
                className='checkoutproduct_image'
                image={image}
                id = {id}
            />
            <div className='checkoutproduct_info'>
                <Title className='checkoutproduct_title' title = {title} id = {id} />
                <p className='checkoutproduct_price'>
                    <small className='checkoutproduct_price_currency'>$</small>
                    <strong className='checkoutproduct_price_value'>{price}</strong>
                </p>
                <div className='checkoutproduct_quantity'>
                    {hideButton == "order" ?
                        (<span className="checkoutproduct_quantity_order">Quantiy : {quantity}</span>)
                        : (<>
                            <button className='checkoutproduct_quantity_increment' onClick={addQuantity}>+</button>
                            <input className='checkoutproduct_quantity_input' value={quantity} disabled />
                            <button
                                className='checkoutproduct_quantity_decrement'
                                onClick={removeQuantity}
                                disabled={quantity == 1 ? true : false}
                            >-</button>
                        </>)
                    }

                </div>
                <div className='checkoutproduct_rating'>
                    {Array(Math.floor(rating?.rate - 0))
                        .fill()
                        .map((_, i) => (
                            <p key={i}>🌟</p>
                        ))}
                </div>
                {!(hideButton == "order") && <button className='checkoutproduct_remove_btn' onClick={removeFromCart}>Remove from Cart</button>}

            </div>
        </div>
    )
}

export default CheckoutProduct