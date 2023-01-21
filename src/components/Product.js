import React from 'react';
import Image from './Image';
import './Product.css';
import { AmazonUseContext } from './StateProvider';
import Title from './Title';

function Product({ id, title, price, rating, image ,quantity}) {
    const [state,dispatch] = AmazonUseContext();

    function addToBasket(){
        dispatch({
            type: 'ADD_TO_CART',
            item:{id,title, price, rating, image,quantity}
        });

    }
    return (
        <div className='product'>
            <div className="product_info">
                <Title className='product_title' title = {title} id = {id}/>
                <p className='product_price'>
                    <small className='product_price_currency'>$</small>
                    <strong className='product_price_value'>{price}</strong>
                </p>
                <div className='product_rating'>
                    {rating && Array(Math.floor(rating?.rate - 0))
                        .fill()
                        .map((_, i) => (
                            <p key={i}>🌟</p>
                        ))}
                </div>
            </div>


            <Image className='product_image' image = {image} id = {id}/>
            <button className='product_button' onClick={addToBasket}>Add to Cart</button>
        </div>
    )
}

export default Product